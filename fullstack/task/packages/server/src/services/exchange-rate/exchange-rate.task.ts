
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { ExchangeRateService } from './exchange-rate.service';
import { ExternalApiNotFoundError } from './../external-api/external-api.error';


@Injectable()
export class ExchangeRateTask {
    private readonly logger = new Logger(ExchangeRateTask.name);

    constructor(private exchangeRateService: ExchangeRateService) {}

    // will run immediately upon application start (can be in onModuleInit() method)
    @Timeout(0)
    async setInitExchangeRates() {
        try {
            await this.exchangeRateService.updateExchangeRatesFromApi();
            this.logger.log('Initial exchange rates update successful');
        } catch (error) {
            this.logger.error(`Failed to update exchange rates on initialization: ${error.message}`);
            throw new ExternalApiNotFoundError();
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleUpdateExchangeRates() {
        try {
            await this.exchangeRateService.updateExchangeRatesFromApi();
            this.logger.log('Exchange rates updated successfully');
        } catch (error) {
            this.logger.error(`Failed to update exchange rates: ${error.message}`);
            throw new ExternalApiNotFoundError();
        }
    }
}
