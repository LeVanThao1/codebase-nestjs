import { IDFactory } from 'src/hepler';
import { Schema, Prop, SchemaFactory, } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, SchemaTypes, Types } from 'mongoose'
import { DATABASE_COLLECTIONS, HISTORY_ACTION } from 'src/constant'

export type HistoryDocument = History & Document

@Schema({
    collection: DATABASE_COLLECTIONS.HISTORY
})
export class History {

    @Prop({
        default: IDFactory.createID(),
        required: true
    })
    _id: string

    @Prop({
        type: String,
        required: true
    })
    document: string

    @Prop({
        type: String,
        required: true
    })
    documentID: string

    @Prop({
        type: String,
        required: true
    })
    description: string

    @Prop({
        type: String,
        required: true,
        enum: HISTORY_ACTION
    })
    action: HISTORY_ACTION

    @Prop({
        ref: DATABASE_COLLECTIONS.USER,
        type: String,
        default: null
    })
    createdBy: string

    @Prop({
        type: Number,
        default: +new Date()
    })
    createdAt: number

    constructor(props: Partial<History>) {
        Object.assign(this, props)
    }
}

export const HistorySchema = SchemaFactory.createForClass(History)
