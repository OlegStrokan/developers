import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlConfig, typeormConfig } from './config';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';
import {ExternalApiModule} from "./services/external-api/external-api.module";
import {HttpModule} from "@nestjs/axios";
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [

        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeormConfig),
        GraphQLModule.forRoot(graphqlConfig),
        HttpModule.register({
            baseURL: process.env.BASE_API_LINK,
            timeout: process.env.API_TIMEOUT ? +process.env.API_TIMEOUT : 5000
        }),
        ScheduleModule.forRoot(),
        ExchangeRateModule,
        ExternalApiModule
    ],
    controllers: [],
})
export class AppModule {}
