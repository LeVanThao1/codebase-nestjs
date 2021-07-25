import { JWTTokenPayload } from './auth.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_COLLECTIONS } from '../../constant';
import { User } from '../user/schema/user.schema';
import { FilterQuery, isValidObjectId, Model } from "mongoose";
import { sign, verify } from 'jsonwebtoken'
import { ConfigurationService } from '../config/config.service';
import { compare, hash } from 'bcrypt'
import { differenceBy, uniqBy } from "lodash";
import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {

    constructor(
        private readonly configSrv: ConfigurationService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async logout(userUpdate: User): Promise<boolean> {
        try {
        } catch (error) {
            return false
        }
        return true
    }

    async verifyToken(token: string): Promise<User> {
        const payload: JWTTokenPayload = await this.jwtService.verify(token);
        if (!payload || !payload.userId ) throw new Error()
        const { userId } = payload;
        const user = await this.userService.findOne({
            filter: {
                _id: userId, isActive: { $ne: true }
            }
        });
        if (!user) throw new Error();
        return user
    }

    public hashPassword(rawPassword: string): Promise<string> {
        return hash(rawPassword, this.configSrv.getPasswordHashSalt())
    }

    public async compareWithHashPwd(rawPwd: string, hashedPwd: string) {
        return compare(rawPwd, hashedPwd)
    }

    public async signUserToken(userId: string): Promise<string> {
        const token = await this.jwtService.sign(
            { userId }
        )
        return token
    }

}
