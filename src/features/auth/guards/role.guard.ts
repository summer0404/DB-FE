import { UserType } from "src/common/constants";
import RequestWithUserDto from "../request_with_user.dto";
import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";

const RoleGuard = (userType: UserType): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUserDto>();
      const { user } = request;
      console.log("role", user);
      const listRole = {
        [UserType.STAFF]: 2,
        [UserType.CUSTOMER]: 1,
      };

      let priority = 0;
      if (user?.userType == UserType.STAFF) priority = listRole[UserType.STAFF];
      else if (user?.userType == UserType.CUSTOMER)
        priority = listRole[UserType.CUSTOMER];

      return priority >= listRole[userType];
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
