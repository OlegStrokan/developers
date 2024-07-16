import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from '../../entities';
import { ExchangeRateData } from '../external-api/types/exchage-data.type';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);

    constructor(
        @InjectRepository(ExchangeRate)
        private exchangeRateRepository: Repository<ExchangeRate>,
        private externalApiService: ExternalApiService,
    ) {}

    async getExchangeRates(): Promise<ExchangeRate[]> {
        try {
            this.logger.log('Fetching exchange rates from the database');
            const exchangeRates = await this.exchangeRateRepository.find();
            this.logger.log(`Fetched ${exchangeRates.length} exchange rates from the database`);
            console.log(exchangeRates)
            return exchangeRates;
        } catch (error) {
            this.logger.error('Failed to fetch exchange rates from the database', error.stack);
            throw new Error('Failed to fetch exchange rates');
        }
    }

    async updateExchangeRatesFromApi(): Promise<void> {
        try {
            this.logger.log('Fetching exchange rates from the external API');
            const exchangeRateData: ExchangeRateData = await this.externalApiService.fetchExchangeRates();
            const exchangeRates: ExchangeRate[] = ExchangeRate.fromExchangeRateData(exchangeRateData);

            await this.exchangeRateRepository.clear();

            await this.exchangeRateRepository.save(exchangeRates);
            this.logger.log('Successfully updated exchange rates from the API');
        } catch (error) {
            this.logger.error('Failed to update exchange rates from the API', error.stack);
            throw new Error('Failed to update exchange rates from API');
        }
    }
}
