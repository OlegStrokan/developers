import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ExchangeRate} from "../../entities";
import {ExchangeRateTask} from "./exchange-rate.task";
import {ExternalApiModule} from "../external-api/external-api.module";
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([ExchangeRate]), ExternalApiModule],
    providers: [ExchangeRateService,ExchangeRateTask, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
