export class Quote {
  CARD_PAYMENT: {
    fiatCurrency: string;
    cryptoAmount: string;
    fiatValue: number;
    baseRampFee: number;
    appliedFee: number;
  };
  asset: {
    price: {
      USD: string;
    };
  };
}

export type GetQuote = {
  cryptoAssetSymbol: string;
  fiatCurrency: string;
  fiatValue: number;
};
