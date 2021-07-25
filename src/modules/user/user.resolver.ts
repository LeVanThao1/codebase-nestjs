import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UserService } from "./user.service";
import { AuthService } from '../auth/auth.service';
import { differenceBy } from "lodash";
import { IsAuthentication, NotAuthentication } from '../auth/decorator';
import { APP_PERMISSIONS, PERMS } from '../../constant';
import { CreateUserInputDTO } from './dto/create-user.dto';

@Resolver('GUser')
export class UserResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Query()
    @IsAuthentication()
    async me(@Context() ctx): Promise<User> {
        const { currentUser } = ctx;
        return currentUser;
    }

    @Query()
    @IsAuthentication()
    async users(@Context() ctx): Promise<User[]> {
        const users = await this.userService.findAll({
            sort: { createdAt: -1 },
            filter: { isActive: true }
        })
        return users;
    }

    @Mutation()
    async createUser(
        @Context() ctx,
        @Args('input') input: CreateUserInputDTO
    ): Promise<User> {
        const newUser = await this.userService.create({
            input,
            context: ctx
        })
        return newUser;
    }

    @ResolveField('fullName')
    async fullName(@Parent() user: User): Promise<string> {
        return `${user.firstName} ${user.lastName}`;
    }

}
