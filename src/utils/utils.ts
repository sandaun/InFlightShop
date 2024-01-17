import {Currency, ExchangeRates} from '../types/utilsTypes';

const exchangeRates: ExchangeRates = {
  EUR: {
    USD: 1.1,
    GBP: 0.85,
  },
  USD: {
    EUR: 0.9,
    GBP: 0.77,
  },
  GBP: {
    USD: 1.3,
    EUR: 1.18,
  },
};

export const convertToMultipleCurrency = (
  amount: number,
  fromCurrency: Currency,
) => {
  const rates = exchangeRates[fromCurrency];
  return Object.keys(rates).reduce((acc: {[key: string]: string}, key) => {
    const rate = rates[key as Currency];
    if (rate) {
      acc[key] = (amount * rate).toFixed(2);
    }
    return acc;
  }, {});
};

export const convertAmountBetweenCurrencies = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
): number => {
  console.log('fromCurrency', fromCurrency, toCurrency);
  const rates = exchangeRates[fromCurrency];
  console.log('rates', rates);

  const rate = rates[toCurrency];
  console.log('rate', rate);

  return amount * rate;
};
