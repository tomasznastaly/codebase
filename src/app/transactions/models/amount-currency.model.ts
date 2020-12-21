export enum CurrencyCode {
  EUR = 'EUR',
}

export interface AmountCurrency {
  amount: number;
  currencyCode: CurrencyCode;
}
