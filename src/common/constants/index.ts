export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development' as const;
export const TEST = 'test' as const;
export const PRODUCTION = 'production' as const;

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
