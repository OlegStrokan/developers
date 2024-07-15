interface CurrencyInfo {
    jednotka: number;
    dev_stred: number | null;
    dev_nakup: number | null;
    dev_prodej: number | null;
    val_stred: number | null;
    val_nakup: number | null;
    val_prodej: number | null;
    nazev: string;
    url: string;
}

export interface ExchangeRateData {
    den: string;
    denc: string;
    banka: string;
    url: string;
    kurzy: {
        [currency: string]: CurrencyInfo;
    };
}
