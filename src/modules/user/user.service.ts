import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { FilterQuery, Model } from "mongoose";
import { DATABASE_COLLECTIONS, HISTORY_ACTION } from '../../constant';
import { AuthService } from '../auth/auth.service';
import { HistoryService } from '../history/history.service';
import { CreateUserInputDTO } from './dto/create-user.dto';
import { GQLUsernameExists } from './user.error';
import { User, UserDocument } from './schema/user.schema';
import moment from 'moment';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(DATABASE_COLLECTIONS.USER) private readonly userModel: Model<UserDocument>,
        private readonly historyService: HistoryService,
    ) { }

    async findAll(args?: {
        filter: FilterQuery<UserDocument>
        sort?: any
    }): Promise<User[]> {
        const { filter, sort } = args || { filter: { }, sort: {} }
        const users = await this.userModel.find({
            isDeleted: false,
            ...filter
        }).sort(sort).exec()
        return users
    }

    async findOne(args?: {
        filter?: FilterQuery<UserDocument>,
        sort?: any
    }): Promise<User> {
        const { filter } = args || { filter: {} }
        const user = await this.userModel.findOne(filter).exec()
        return user
    }

    async create(args: {
        input: CreateUserInputDTO
        context?: any
    }): Promise<User | null> {
        try {
            const { input, context } = args
            const foundUser = await this.findOne({
                filter: {
                    username: input.username
                }
            });
            if (foundUser) throw new GQLUsernameExists()
            const password = hashSync(input.password || "123456789", 10)
            const newUser = new this.userModel({
                ...input,
                password,
                // roles: input.roles || ["APP_MEMBER"],
                createdBy: new User({ _id: context?.currentUser?._id })
            })
            await newUser.save()
            return newUser
        } catch (error) {
            throw(error)
        }
    }

    async saveUser(user, context?: any): Promise<User> {
        const newUser = await this.userModel.create(user);
        // await this.historyService.createHistory({
        //     _id: null,
        //     action: HISTORY_ACTION.CREATE,
        //     document: newUser,
        //     documentLog: null,
        //     onModal: DATABASE_COLLECTIONS.USER,
        //     createdAt: null,
        //     createdBy: userCreate
        // })
        return newUser;
    }

    async updateOne(args?: {
        filter?: FilterQuery<UserDocument>,
        update: Partial<User>
    }): Promise<User> {
        const { filter, update } = args || { filter: {}, update: {} }
        const user = await this.userModel.findOneAndUpdate(
            filter,
            {
                $set: {
                    ...update
                }
            },
            {
                new: true
            }
        ).exec()
        return user
    }

    async updateMany(args?: {
        filter?: FilterQuery<UserDocument>,
        update: Partial<User>
    }): Promise<User[]> {
        const { filter, update } = args || { filter: {}, update: {} }
        const [users] = await Promise.all([
            this.findAll({ filter }),
            this.userModel.updateMany(
                filter,
                {
                    $set: {
                        ...update
                    }
                }
            )

        ])
        return users
    }

    async deleteMany(args: {
        filter?: FilterQuery<UserDocument>,
    }): Promise<User[]> {
        const { filter } = args
        const [users] = await Promise.all([
            this.findAll({ filter: { ...filter, isActive: true, deletedAt: undefined } }),
            this.userModel.updateMany(
                { ...filter, isActive: true },
                {
                    $set: {
                        isActive: true,
                        deletedAt: moment().valueOf()
                    }
                }
            )

        ])
        return users
    }
}
