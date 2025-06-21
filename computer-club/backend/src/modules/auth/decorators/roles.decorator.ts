import { SetMetadata } from '@nestjs/common';
import { ALLOWED_ROLES } from '../../../constants/common';
import { UserRole } from '../../../constants/enums';

export const Roles = (...roles: UserRole[]) => SetMetadata(ALLOWED_ROLES, roles);
