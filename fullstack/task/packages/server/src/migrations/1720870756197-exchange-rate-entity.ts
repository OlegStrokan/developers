import { MigrationInterface, QueryRunner } from "typeorm";

export class exchangeRateEntity1720870756197 implements MigrationInterface {
    name = 'exchangeRateEntity1720870756197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "currency" character varying(3) NOT NULL, "buyingRate" numeric(10,4) NOT NULL, "sellingRate" numeric(10,4) NOT NULL, "name" character varying(255) NOT NULL, "currencyUnit" integer NOT NULL, CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }

}
