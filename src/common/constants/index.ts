export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development' as const;
export const TEST = 'test' as const;
export const PRODUCTION = 'production' as const;

export const USER_REPOSITORY = 'USER_REPOSITORY';
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';

export enum UserType {
  CUSTOMER = 'Customer',
  STAFF = 'Staff',
}

export enum SeatStatus {
  EMPTY = 'Empty',
  FULL = 'Full',
}

export enum MovieGenre {
  ACTION = 'Action', // Phim hanh dong
  ADVENTURE = 'Adventure', // Phim phieu luu
  COMEDY = 'Comedy', // Phim hai
  HORROR = 'Horror', // Phim kinh di
  DRAMA = 'Drama', // Phim tam ly
  ROMANCE = 'Romance', // Phim tim cam
  SCIENCEFICTION = 'Sciencefiction', // Phim khoa hoc vien tuong
  ANIMATION = 'Animation', // Phim hoat hinh
  HISTORICAL = 'Historical', // Phim lich su
  FAMILY = 'Family', // Phim gia dinh
}

export enum SizeFastfood {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  BIG = 'Big',
}

export enum PaymentMethod {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}

export enum PaymentStatus {
  CANCELLED = 'Đã hủy',
  IN_PROGRESS = 'Đang chờ thanh toán',
  OK = 'Thành công',
}
