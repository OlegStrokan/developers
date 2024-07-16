import { Injectable, Logger } from '@nestjs/common';
import { HttpService as AxiosHttpService } from "@nestjs/axios";
import { ExchangeRateData } from "./types/exchage-data.type";
import { ExternalApiNotFoundError } from "./external-api.error";
import { OperationFunction, retry } from "../../common";
import { EXCHANGE_RATE_URL } from "./constants";

@Injectable()
export class ExternalApiService {
    private readonly logger = new Logger(ExternalApiService.name);

    constructor(private httpService: AxiosHttpService) {}

    async fetchExchangeRates(): Promise<ExchangeRateData> {
        const operation: OperationFunction<ExchangeRateData> = async () => {
            this.logger.log('Requesting exchange rates from external API');
            const response = await this.httpService.get(EXCHANGE_RATE_URL).toPromise();
            if (!response || !response.data) {
                this.logger.warn('No data received from external API');
                throw new ExternalApiNotFoundError();
            }
            this.logger.log('Received exchange rates from external API');
            return response.data;
        };

        try {
            return await retry(operation, 3, 200);
        } catch (error) {
            this.logger.error('Error fetching exchange rates after retries', error.stack);
            throw error;
        }
    }
}
