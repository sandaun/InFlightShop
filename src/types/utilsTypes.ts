export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

export type ExchangeRates = {
  [outerKey in Currency]: {
    [innerKey in Currency]?: number;
  };
};
