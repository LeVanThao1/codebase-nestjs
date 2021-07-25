import { Parent, Query, ResolveField, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthenticationInfo } from 'src/schema';
import { UserService } from '../user/user.service';
import { GQLUnauthenticatedError } from './auth.error';
import { AuthService } from './auth.service';
import { NotAuthentication } from './decorator';
import { LoginInputDTO } from './dto/login.dto';

@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Mutation()
    @NotAuthentication()
    async login(@Args("info") input: LoginInputDTO): Promise<AuthenticationInfo> {
        const { username, password } = input;
        const user = await this.userService.findOne({
            filter: {
                isActive: false,
                $or: [
                    { username },
                    { email: username }
                ]
            }
        });
        if (!user) throw new GQLUnauthenticatedError('Tài khoản hoặc mật khẩu không đúng')
        const checkPassword = await this.authService.compareWithHashPwd(password, user.password)
        if (!checkPassword) throw new GQLUnauthenticatedError('Tài khoản hoặc mật khẩu không đúng')
        const token = await this.authService.signUserToken(user._id);
        return {
            token,
            userId: user._id
        };
    }

    @Mutation()
    async logout(@Context() ctx): Promise<boolean> {
        const { session, currentUser } = ctx;
        return this.authService.logout(currentUser);
    }
}
