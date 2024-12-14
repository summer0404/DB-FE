import { UUID } from "crypto";
import { UserType } from "src/common/constants";

export interface TokenPayload {
  userId: UUID;
  userType: UserType;
}
