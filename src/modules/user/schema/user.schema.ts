import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, SchemaTypes, Types } from 'mongoose'
import { IDFactory } from 'src/hepler'
import { DATABASE_COLLECTIONS } from 'src/constant'

export type UserDocument = User & Document

@Schema({
    collection: DATABASE_COLLECTIONS.USER
})
export class User{

    @Prop({
        default: IDFactory.createID(),
        required: true
    })
    _id: string

    @Prop({
        required: true,
    })
    username: string

    @Prop({
        required: true,
    })
    firstName: string
    
    @Prop({
        required: true,
    })
    lastName: string

    @Prop()
    displayName?: string

    @Prop()
    picture?: string

    @Prop({
        required: true
    })
    password: string

    @Prop({
        required: true
    })
    email: string

    @Prop({
        required: true,
        default: true
    })
    isActive: boolean

    @Prop({
        type: Number
    })
    createdAt: number

    @Prop({
        type: Number
    })
    updatedAt?: number

    @Prop({
        type: Number
    })
    deletedAt?: number

    constructor(props: Partial<User>) {
        // super()
        Object.assign(this, props)
    }

}

export const UserSchema = SchemaFactory.createForClass(User)
