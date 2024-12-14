import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Put,
  Inject,
  BadRequestException,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import { PaymentStatus, SEQUELIZE } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { CouponsService } from "../coupons/coupons.service";
import { UsersService } from "../users/users.service";
import { TicketsService } from "../tickets/tickets.service";
import { BookService } from "../book/book.service";
import { FastfoodsService } from "../fastfoods/fastfoods.service";
import { NewOrderInterface } from "./newOrder.interface";
import { Fastfoods } from "../fastfoods/fastfoods.entity";
import { ShowtimeService } from "../showtime/showtime.service";

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logger: LoggerService,
    private readonly response: Response,
    private readonly couponService: CouponsService,
    private readonly userService: UsersService,
    private readonly ticketService: TicketsService,
    private readonly bookService: BookService,
    private readonly fastfoodService: FastfoodsService,
    private readonly showtimeService: ShowtimeService,
    @Inject(SEQUELIZE)
    private readonly dbSource: Sequelize,
  ) {}

  @Post()
  @ApiOperation({
    summary: "API để tạo đơn hàng",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tạo đơn hàng thành công",
        data: {
          order: {
            id: "9f31d111-57da-4c82-b961-02350ac83057",
            createdTime: "2024-12-14T16:29:47.360Z",
            totalPrice: 150,
            staffId: null,
            couponId: null,
            userId: "302927fc-6874-4481-9cba-994c619aad80",
            paymentMethod: "Online",
            timePayment: null,
            paymentStatus: "Đang chờ thanh toán",
            realPrice: 150,
            createdAt: "2024-12-14T16:33:09.081Z",
            updatedAt: "2024-12-14T16:33:09.214Z",
          },
          fastfoods: [
            {
              id: "57882994-5c2b-414b-a53e-068d0e6b09f9",
              name: "CocaCola",
              group: "Popcorn",
              price: 40,
              size: "Big",
              quantity: 2,
            },
          ],
          orderTickets: [
            {
              movieId: "687c86e4-4e29-4763-ac2d-9f8638f88050",
              startTime: "2024-12-12T07:01:31.192Z",
              endTime: "2024-12-12T08:01:31.192Z",
              price: 45,
              seatPosition: 1,
              orderId: "9f31d111-57da-4c82-b961-02350ac83057",
            },
            {
              movieId: "687c86e4-4e29-4763-ac2d-9f8638f88050",
              startTime: "2024-12-12T07:01:31.192Z",
              endTime: "2024-12-12T08:01:31.192Z",
              price: 45,
              seatPosition: 2,
              orderId: "9f31d111-57da-4c82-b961-02350ac83057",
            },
          ],
          roomInfo: {
            movieId: "687c86e4-4e29-4763-ac2d-9f8638f88050",
            startTime: "2024-12-12T07:01:31.192Z",
            endTime: "2024-12-12T08:01:31.192Z",
            roomId: 2,
            createdAt: "2024-12-14T09:02:10.334Z",
            updatedAt: "2024-12-14T09:02:15.275Z",
            room: {
              id: 2,
              name: "Tên phòng chiếu2",
              createdAt: "2024-12-14T09:02:05.562Z",
              updatedAt: "2024-12-14T09:02:05.562Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Dữ liệu đầu vào không hợp lệ",
    schema: {
      example: {
        success: false,
        message: "Dữ liệu đầu vào không hợp lệ",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tạo đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo đơn hàng",
        data: null,
      },
    },
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Body() any,
    @Res() res,
  ): Promise<Response> {
    let transaction = await this.dbSource.transaction();
    try {
      let realPrice = 0;
      let isUsed = [];
      let createdTickets = [];
      let createdBooks = [];
      if (createOrderDto?.couponId && createOrderDto?.couponId != undefined) {
        const coupon = await this.couponService.findOne(
          createOrderDto.couponId,
        );
        const user = await this.userService.findOne(createOrderDto.userId);
        if (
          coupon.isUsed.includes(user?.email) ||
          coupon.expirationDate < new Date()
        )
          throw new BadRequestException(
            "Phiếu giảm giá đã hết hạn hoặc đã được sử dụng",
          );
        realPrice = Number(
          ((createOrderDto.totalPrice * (100 - coupon.percent)) / 100).toFixed(
            2,
          ),
        );
        isUsed = coupon.isUsed;
        await this.couponService.updateTransaction(
          coupon.id,
          { isUsed: [user.email] },
          transaction,
        );
      }
      const newOrder = await this.ordersService.createTransaction(
        createOrderDto,
        transaction,
      );
      if (realPrice == 0) {
        realPrice = newOrder.totalPrice;
      }
      if (any?.tickets && any?.tickets != undefined) {
        let tickets = any.tickets;
        for (let i in tickets) tickets[i].orderId = newOrder.id;
        let temp = await this.ticketService.createAllTransaction(
          tickets,
          transaction,
        );
        temp.map((item) => {
          createdTickets.push(item.id);
        });
      }
      if (any?.books && any?.books != undefined) {
        let books = any.books;
        for (let i in books) books[i].orderId = newOrder.id;
        let temp = await this.bookService.createAllTransaction(
          books,
          transaction,
        );
        temp.map((item) => {
          createdBooks.push({
            orderId: item.orderId,
            fastfoodId: item.fastfoodId,
          });
        });
      }
      await this.ordersService.updateTransaction(
        newOrder.id,
        { realPrice } as UpdateOrderDto,
        transaction,
      );

      let order = await this.ordersService.findOneTransaction(
        newOrder.id,
        transaction,
      );
      let result: NewOrderInterface = { order };

      let fastfoods = [];
      if (createdBooks.length > 0) {
        for (let i of any.books) {
          let newfastfood: Fastfoods = await this.fastfoodService.findOneNoImg(
            i.fastfoodId,
          );
          fastfoods.push({
            id: newfastfood.id,
            name: newfastfood.name,
            group: newfastfood.foodGroup,
            price: newfastfood.price,
            size: i.size,
            quantity: i.quantity,
          });
        }
      }
      let roomInfo = {};
      if (any?.tickets && any?.tickets != undefined) {
        let temp = await this.showtimeService.getShowtimeAndRoom(
          any.tickets[0].movieId,
          any.tickets[0].startTime,
          any.tickets[0].endTime,
          transaction,
        );

        roomInfo = temp;
      }
      result = { ...result, fastfoods, orderTickets: any.tickets, roomInfo };

      transaction.commit();
      setTimeout(
        async () => {
          try {
            const checkOrder = await this.ordersService.findOneToCheck(
              newOrder.id,
            );
            if (checkOrder.paymentStatus == PaymentStatus.IN_PROGRESS) {
              await this.ordersService.update(newOrder.id, {
                paymentStatus: PaymentStatus.CANCELLED,
              });

              await this.couponService.updateNew(createOrderDto.couponId, {
                isUsed,
              });

              if (createdBooks.length > 0) {
                for (let i of createdBooks)
                  await this.bookService.removeNew(i.orderId, i.fastfoodId);
              }

              if (createdTickets.length > 0) {
                for (let i of createdTickets)
                  await this.ticketService.remove(i);
              }
            }
          } catch (err) {}
        },
        5 * 60 * 1000,
      );
      this.logger.debug("Tạo đơn hàng thành công");
      this.response.initResponse(true, "Tạo đơn hàng thành công", result);
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      transaction.rollback();
      this.logger.error("Xảy ra lỗi trong quá trình tạo đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tạo đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: "API để lấy thông tin tất cả đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm tất cả đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm tất cả phiếu giảm giá thành công",
        data: [
          {
            id: "9812466d-46c8-4f2d-bd2d-7a80816f6ecb",
            isUsed: ["4f9cecc2-ae14-42f0-8548-134b8f85bfbd"],
            name: "Chào mừng bạn mới",
            expirationDate: "2024-11-27T17:56:29.279Z",
            percent: 3,
            createdAt: "2024-12-02T12:15:49.744Z",
            updatedAt: "2024-12-02T12:15:49.744Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm đơn hàng",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const orders = await this.ordersService.findAll();
      this.logger.debug("Tìm tất cả đơn hàng thành công");
      this.response.initResponse(
        true,
        "Tìm tất cả đơn hàng thành công",
        orders,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi trong quá trình tìm đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "API tìm kiếm thông tin của đơn hàng qua id",
    description: "Cần truyền vào id của đơn hàng dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm đơn hàng thành công",
        data: {
          id: "a13963fb-51f0-41f9-a3b7-02ad38b9f5f1",
          createdTime: "2025-12-16T02:00:54.663Z",
          totalPrice: 120,
          staffId: null,
          couponId: null,
          userId: "0a895749-221e-4015-b6d5-ea66cc27ee79",
          paymentMethod: "Online",
          timePayment: null,
          paymentStatus: "Thành công",
          createdAt: "2024-11-28T14:11:57.761Z",
          updatedAt: "2024-11-28T14:11:57.761Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "ID phải có dạng UUIDv4",
    schema: {
      example: {
        success: false,
        message: "ID phải có dạng UUIDv4",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm kiếm đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm đơn hàng",
        data: null,
      },
    },
  })
  async findOne(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const order = await this.ordersService.findOne(id);
      this.logger.debug("Tìm kiếm đơn hàng thành công");
      this.response.initResponse(true, "Tìm kiếm đơn hàng thành công", order);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình tìm kiếm đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm kiếm đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin đơn hàng",
    description: "Cần truyền vào ID dạng UUIDv4 và updateCouponDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin đơn hàng thành công",
        data: {
          id: "a13963fb-51f0-41f9-a3b7-02ad38b9f5f1",
          createdTime: "2025-12-16T02:00:54.663Z",
          totalPrice: 120,
          staffId: null,
          couponId: null,
          userId: "0a895749-221e-4015-b6d5-ea66cc27ee79",
          paymentMethod: "Online",
          timePayment: "2024-11-28T10:14:11.522Z",
          paymentStatus: "Thành công",
          createdAt: "2024-11-28T14:11:57.761Z",
          updatedAt: "2024-12-02T12:19:05.660Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Đầu vào không hợp lệ",
    schema: {
      example: {
        success: false,
        message: "Đầu vào không hợp lệ",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() res,
  ) {
    try {
      const updatedOrder = await this.ordersService.update(id, updateOrderDto);
      this.logger.debug("Cập nhật thông tin đơn hàng thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin đơn hàng thành công",
        updatedOrder,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình cập nhật thông tin đơn hàng",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa đơn hàng",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa đơn hàng thành công",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Dữ liệu đầu vào không hợp lệ",
    schema: {
      example: {
        success: false,
        message: "Dữ liệu đầu vào không hợp lệ",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình xóa đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa đơn hàng",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.ordersService.remove(id);
      this.logger.debug("Xóa đơn hàng thành công");
      this.response.initResponse(true, "Xóa đơn hàng thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình xóa đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
