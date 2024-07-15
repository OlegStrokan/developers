import { Field, ObjectType, Int, Float } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { EntityWithMeta } from "../common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { VAR_CHAR } from "./constants";
import {ExchangeRateData} from "../services/external-api/types/exchage-data.type";

@ObjectType()
@Entity()
export class ExchangeRate extends EntityWithMeta {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 3 })
    public currency!: string;

    @Field(() => Float)
    @IsNotEmpty()
    @IsNumber()
    @Column('decimal', { precision: 10, scale: 4 })
    buyingRate!: number;

    @Field(() => Float)
    @IsNotEmpty()
    @IsNumber()
    @Column('decimal', { precision: 10, scale: 4 })
    sellingRate!: number;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @Column({ ...VAR_CHAR })
    name!: string;

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    @Column('int')
    currencyUnit!: number;

    static fromExchangeRateData(data: ExchangeRateData): ExchangeRate[] {
        const exchangeRates: ExchangeRate[] = [];

        Object.keys(data.kurzy).forEach(currency => {
            const currencyInfo = data.kurzy[currency];

            const exchangeRate = new ExchangeRate();
            exchangeRate.currency = currency;
            exchangeRate.buyingRate = currencyInfo.dev_nakup || 0; 
            exchangeRate.sellingRate = currencyInfo.dev_prodej || 0;
            exchangeRate.name = currencyInfo.nazev;
            exchangeRate.currencyUnit = currencyInfo.jednotka || 1; // Use 1 as default if jednotka (from czech: rate) is null

            exchangeRates.push(exchangeRate);
        });

        return exchangeRates;
    }
}
