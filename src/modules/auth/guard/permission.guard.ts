import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { difference, differenceBy } from "lodash";
import { UnauthorizedError } from "../auth.error";
import { EnumDecorator } from "../../../constant";

export class PermissionGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermission = this.reflector.get<string[]>(
            EnumDecorator.PERMISSIONS,
            context.getHandler()
        )
        if (!requiredPermission || requiredPermission.length < 1) return true;
        const ctx = context.getArgByIndex(2);
        const userPermissions = ctx.permissions
        if (!userPermissions || !Array.isArray(userPermissions)) return false
        const checkPermission = requiredPermission.every(p => (
            userPermissions.includes(p)
        ))
        if (!checkPermission)
            throw new UnauthorizedError('Forbidden Permission');
        return true;
    }
}
