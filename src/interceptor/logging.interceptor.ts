import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class Logging implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const startAt = +new Date()
    // const gqlCtx = GqlExecutionContext.create(context)

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        // console.log(
        //   '⛩  ',
        //   chalk.hex('#eb2f96').bold(context.getArgs()[3].parentType),
        //   '»',
        //   context.getArgs()[3].fieldName,
        //   chalk.hex('#fff566')(`+${Date.now() - now}ms`),
        //   new Date().toLocaleString(),
        // );
        // const actionType = String(gqlCtx['args'][3].parentType)
        // if (['Query', 'Mutation'].indexOf(actionType) > -1)
        //   Console.log(
        //     chalk.greenBright(`Interceptor: `) +
        //       `${gqlCtx['args'][3].parentType} finished in ${+new Date() -
        //         startAt}ms`
        //   )
      }),
      catchError((error) => {
        // Console.error(
        //   chalk.redBright(`Interceptor: `) +
        //     (error + '').replace(/(Error: |Authentication|UserInputError: )+/g, '')
        // )
        return throwError(null)
      }),
    );
  }
}
