import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "./database.config";
import {
  DEVELOPMENT,
  PRODUCTION,
  SEQUELIZE,
  TEST,
} from "../../common/constants";
import { Users } from "src/features/users/users.entity";
import { Customers } from "src/features/customers/customers.entity";
import { Staffs } from "src/features/staffs/staffs.entity";
import { Files } from "src/features/files/files.entity";
import { Movies } from "src/features/movies/movies.entity";
import { Actors } from "src/features/actors/actors.entity";
import { Book } from "src/features/book/book.entity";
import { Comments } from "src/features/comments/comments.entity";
import { Coupons } from "src/features/coupons/coupons.entity";
import { Directors } from "src/features/directors/directors.entity";
import { Fastfoods } from "src/features/fastfoods/fastfoods.entity";
import { Genre } from "src/features/genre/genre.entity";
import { Orders } from "src/features/orders/orders.entity";
import { Rates } from "src/features/rates/rates.entity";
import { Rooms } from "src/features/rooms/rooms.entity";
import { Seats } from "src/features/seats/seats.entity";
import { Showtime } from "src/features/showtime/showtime.entity";
import { Tickets } from "src/features/tickets/tickets.entity";

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        Actors,
        Book,
        Comments,
        Coupons,
        Customers,
        Directors,
        Fastfoods,
        Files,
        Genre,
        Movies,
        Orders,
        Rates,
        Rooms,
        Seats,
        Showtime,
        Staffs,
        Tickets,
        Users,
      ]);

      try {
        await sequelize.sync({ alter: true });
      } catch (error) {
        console.error("Error during sequelize sync:", error);
      }

      return sequelize;
    },
  },
];
