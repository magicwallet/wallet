export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CNY = 'CNY',
  JPY = 'JPY',
  KRW = 'KRW',
  INR = 'INR',
  CAD = 'CAD',
  HKD = 'HKD',
  AUD = 'AUD',
  BRL = 'BRL',
  TWD = 'TWD',
  CHF = 'CHF',
  RUB = 'RUB',
}

// list from https://www.fiatmarketcap.com/

export const CurrencyList = Object.keys(Currency) as (keyof typeof Currency)[];
