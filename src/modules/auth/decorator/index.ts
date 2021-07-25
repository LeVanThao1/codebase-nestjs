import { SetMetadata } from "@nestjs/common";
import { EnumDecorator } from "../../../constant";

export const RequirePermissions = (...perms: string[]) => SetMetadata(EnumDecorator.PERMISSIONS, perms)

export const IsAuthentication = () => SetMetadata(EnumDecorator.ISAUTHEN, true)
export const NotAuthentication = () => SetMetadata(EnumDecorator.NOT_AUTHEN, true)
