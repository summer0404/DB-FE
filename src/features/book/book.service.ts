import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { BOOK_REPOSITORY } from 'src/common/constants';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository.create(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }

  async findOne(orderId: string): Promise<Book> {
    return await this.bookRepository.findOne({ where: { orderId } });
  }

  async update(orderId: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOne({
      where: { orderId },
    });

    if (!existingBook)
      throw new BadRequestException('Không tồn tại thức ăn nhanh');

    const [numRecordUpdates, [updateRecordData]] =
      await this.bookRepository.update(updateBookDto, {
        where: {
          orderId,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(orderId: string) {
    const existingBook = await this.bookRepository.findOne({
      where: { orderId },
    });

    if (!existingBook)
      throw new BadRequestException('Không tồn tại thức ăn nhanh tương ứng');

    await this.bookRepository.destroy({ where: { orderId } });
  }
}
