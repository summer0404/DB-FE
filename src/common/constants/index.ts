export const SEQUELIZE = "SEQUELIZE";
export const DEVELOPMENT = "development" as const;
export const TEST = "test" as const;
export const PRODUCTION = "production" as const;

// Const define repository
export const USER_REPOSITORY = "USER_REPOSITORY";
export const CUSTOMER_REPOSITORY = "CUSTOMER_REPOSITORY";
export const STAFF_REPOSITORY = "STAFF_REPOSITORY";
export const COUPON_REPOSITORY = "COUPON_REPOSITORY";
export const FASTFOOD_REPOSITORY = "FASTFOOD_REPOSITORY";
export const ORDER_REPOSITORY = "ORDER_REPOSITORY";
export const BOOK_REPOSITORY = "BOOK_REPOSITORY";
export const TICKET_REPOSITORY = "TICKET_REPOSITORY";
export const FILE_REPOSITORY = "FILE_REPOSITORY";
export const ACTORS_REPOSITORY = "ACTORS_REPOSITORY";
export const DIRECTORS_REPOSITORY = "DIRECTORS_REPOSITORY";
export const MOVIES_REPOSITORY = "MOVIES_REPOSITORY";
export const COMMENTS_REPOSITORY = "COMMENTS_REPOSITORY";
export const ROOMS_REPOSITORY = "ROOMS_REPOSITORY";
export const SHOWTIMES_REPOSITORY = "SHOWTIMES_REPOSITORY";
export const GENRE_REPOSITORY = "GENRE_REPOSITORY";
export const RATES_REPOSITORY = "RATES_REPOSITORY";
export const SEATS_REPOSITORY = "SEATS_REPOSITORY";

export enum UserType {
  CUSTOMER = "Customer",
  STAFF = "Staff",
}

export enum SeatStatus {
  EMPTY = "Empty",
  FULL = "Full",
}

export enum MovieGenre {
  ACTION = "Action", // Phim hanh dong
  ADVENTURE = "Adventure", // Phim phieu luu
  COMEDY = "Comedy", // Phim hai
  HORROR = "Horror", // Phim kinh di
  DRAMA = "Drama", // Phim tam ly
  ROMANCE = "Romance", // Phim tim cam
  SCIENCEFICTION = "Sciencefiction", // Phim khoa hoc vien tuong
  ANIMATION = "Animation", // Phim hoat hinh
  HISTORICAL = "Historical", // Phim lich su
  FAMILY = "Family", // Phim gia dinh
}

export enum SizeFastfood {
  SMALL = "Small",
  MEDIUM = "Medium",
  BIG = "Big",
}

export enum PaymentMethod {
  ONLINE = "Online",
  OFFLINE = "Offline",
}

export enum PaymentStatus {
  CANCELLED = "Đã hủy",
  IN_PROGRESS = "Đang chờ thanh toán",
  OK = "Thành công",
}
