import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { EnumDecorator } from "src/constant";
import { UnauthorizedError } from "../auth.error";

export class Authencation implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const notAuthen = this.reflector.get<boolean | null>(
            EnumDecorator.NOT_AUTHEN,
            context.getHandler()
        );
        if (notAuthen) return true;
        const ctx = context.getArgByIndex(2);
        if (!ctx?.currentUser)
            throw new UnauthorizedError('Forbidden Permission');
        return true
    }

}
