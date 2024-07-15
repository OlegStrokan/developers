import { getExchangeRateExternalData } from "src/services/external-api/tests/mocks/mock-data";
import {ExchangeRate} from "../../../entities";
import { getExchangeRateData } from '../mocks/mock-data'

describe('ExchangeRate Mapper', () => {
    it('should correctly map ExchangeRateData to ExchangeRate entities', () => {
        const testExchangeData = getExchangeRateExternalData();

        const expectedResult = getExchangeRateData()
        const result = ExchangeRate.fromExchangeRateData(testExchangeData);

        expect(result).toHaveLength(expectedResult.length);
        result.forEach((rate, index) => {
            expect(rate.currency).toBe(expectedResult[index].currency);
            expect(rate.buyingRate).toBe(expectedResult[index].buyingRate);
            expect(rate.sellingRate).toBe(expectedResult[index].sellingRate);
            expect(rate.name).toBe(expectedResult[index].name);
            expect(rate.currencyUnit).toBe(expectedResult[index].currencyUnit);
        });
    });
});
