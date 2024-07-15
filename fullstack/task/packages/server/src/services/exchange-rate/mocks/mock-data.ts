import { EntityWithMeta } from 'src/common';

// TODO add types
export const getExchangeRateData = () => {

        return [  {
                currency: 'USD',
                buyingRate: 21.35,
                sellingRate: 21.55,
                name: 'US Dollar',
                currencyUnit: 1
            },
            {
                currency: 'EUR',
                buyingRate: 25.70,
                sellingRate: 25.90,
                name: 'Euro',
                currencyUnit: 1
            }
        ];
}