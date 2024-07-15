import { ExchangeRateData } from "../../types/exchage-data.type";

// just dummy data. in production better to use faker.js for genering test data
export const getExchangeRateExternalData = (): ExchangeRateData => {
    return {
    den: '2024-07-13',
    denc: '20240713',
    banka: 'Czech National Bank',
    url: 'http://example.com',
    kurzy: {
        USD: {
            jednotka: 1,
            dev_stred: null,
            dev_nakup: 21.35,
            dev_prodej: 21.55,
            val_stred: null,
            val_nakup: null,
            val_prodej: null,
            nazev: 'US Dollar',
            url: 'http://example.com/usd'
        },
        EUR: {
            jednotka: 1,
            dev_stred: null,
            dev_nakup: 25.70,
            dev_prodej: 25.90,
            val_stred: null,
            val_nakup: null,
            val_prodej: null,
            nazev: 'Euro',
            url: 'http://example.com/eur'
        }
    }
}
};
