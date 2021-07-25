import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { HistoryService } from "./history.service";
import { History } from './schema/history.schema';
import { NotAuthentication, IsAuthentication } from '../auth/decorator';

@Resolver('GHistory')
export class HistoryResolver {

    constructor(
        private readonly historyService: HistoryService,
    ) {
    }

    @Query()
    @NotAuthentication()
    async histories(): Promise<History[]> {
        const histories = await this.historyService.findAll();
        return histories
    }

    @Query()
    @IsAuthentication()
    async historiesOfUser(@Context() ctx): Promise<History[]> {
        const histories = await this.historyService.historiesOfUser(ctx._id);
        return histories;
    }
}
