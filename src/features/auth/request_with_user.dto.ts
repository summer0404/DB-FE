import { UUID } from "crypto";
import { Request } from "express";
import { UserType } from "src/common/constants";

interface RequestWithUserDto extends Request {
  user: {
    userId: UUID;
    gid?: string;
    userType: UserType;
  };
}

export default RequestWithUserDto;
