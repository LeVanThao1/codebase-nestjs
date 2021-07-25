import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { NotEnoughGQLArguments } from './gql.error'

@Injectable()
export class GQLAgumentGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredArgs = this.reflector.get<string[]>(
      'args',
      context.getHandler()
    )
    if (!requiredArgs) {
      return true
    }
    const providedArgs = context.getArgByIndex(1)
    const getValue = (object, keys) => keys.split('.').reduce((o, k) => (o || {})[k], object);

    for (const arg of requiredArgs) {
        const currentValue = getValue(providedArgs || {}, arg)
        if (!currentValue) {
            continue
        } else return true
    }
    throw new NotEnoughGQLArguments("One of theses must be specified: " + requiredArgs)
  }
}
