import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { ExchangeRateData } from 'src/services/external-api/types/exchage-data.type';
import { ExternalApiService } from '../external-api.service';
import { Logger } from '@nestjs/common';
import { EXCHANGE_RATE_URL } from '../constants';
import {ExternalApiNotFoundError} from "../../exchange-rate/exchange-rate.error";
import { getExchangeRateExternalData } from './mocks/mock-data';

describe('ExternalApiService test', () => {
    let service: ExternalApiService;
    let httpService: AxiosHttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExternalApiService,
                {
                    provide: AxiosHttpService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: Logger,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn(),
                        warn: jest.fn(),
                    }
                }
            ],
        }).compile();

        service = module.get<ExternalApiService>(ExternalApiService);
        httpService = module.get<AxiosHttpService>(AxiosHttpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should fetch exchange rates successfully', async () => {
        const axiosResponse: AxiosResponse<ExchangeRateData> = {
            data: getExchangeRateExternalData(),
            status: 200,
            statusText: 'OK',
            headers: {} as any,
            config: {
                url: EXCHANGE_RATE_URL,
                method: 'get',
                headers: {} as any,
            },
        };

        jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

        const result = await service.fetchExchangeRates();
        expect(result).toEqual(getExchangeRateExternalData());
    });

    it('should throw ExternalApiNotFoundError if no data received', async () => {
        const axiosResponse: AxiosResponse<ExchangeRateData> = {
            data: null as any,
            status: 200,
            statusText: 'OK',
            headers: {} as any,
            config: {
                url: EXCHANGE_RATE_URL,
                method: 'get',
                headers: {} as any,
            },
        };

        jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

        await expect(service.fetchExchangeRates()).rejects.toThrowError(new ExternalApiNotFoundError().message);
    });

    it('should retry fetching exchange rates if an error occurs', async () => {
        const error = new Error('Network error');
        jest.spyOn(httpService, 'get').mockReturnValue(throwError(error));

        await expect(service.fetchExchangeRates()).rejects.toThrow(error);
        expect(httpService.get).toHaveBeenCalledTimes(3);
    });
});
