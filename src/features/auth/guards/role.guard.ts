import { ROLE } from "src/common/constants";
import RequestWithUserDto from "../request_with_user.dto";
import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";

const RoleGuard = (role: ROLE): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUserDto>();
      const { user } = request;
      const listRole = {
        [ROLE.ADMIN]: 3,
        [ROLE.STAFF]: 2,
        [ROLE.CUSTOMER]: 1,
      };

      let priority = 0;
      if (user?.roles.includes(ROLE.ADMIN)) 
        priority = listRole[ROLE.ADMIN];
      else if (user?.roles.includes(ROLE.STAFF))
        priority = listRole[ROLE.STAFF];
      else if (user?.roles.includes(ROLE.CUSTOMER))
        priority = listRole[ROLE.CUSTOMER];

      return priority >= listRole[role];
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
