import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from "mongoose";
import { DATABASE_COLLECTIONS } from '../../constant';
import { History, HistoryDocument } from './schema/history.schema';

@Injectable()
export class HistoryService {

    constructor(
        @InjectModel(DATABASE_COLLECTIONS.HISTORY) private readonly historyModel: Model<HistoryDocument>,
    ) {
     }

    async findAll(args?: {
        filter: FilterQuery<HistoryDocument>
    }): Promise<History[]> {
        const { filter } = args || { filter: {} }
        const historys = await this.historyModel.find(filter).exec()
        return historys
    }

    async findOne(args?: {
        filter: FilterQuery<HistoryDocument>
    }): Promise<History> {
        const { filter } = args || { filter: {} }
        const history = await this.historyModel.findOne(filter).exec()
        return history
    }

    async createHistory(history: History) {
        const newHistory = await this.historyModel.create(history);
        return newHistory
    }

    async historiesOfUser(userId: string): Promise<History[]> {
        const histories = await this.historyModel.find({
            createdBy: userId
        });
        return histories;
    }

}
