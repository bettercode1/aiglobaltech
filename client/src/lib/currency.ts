// Currency conversion rates (as of April 2023)
// Note: In a production app, you'd want to fetch these from an API
const CONVERSION_RATES = {
  USD: 1,
  CAD: 1.36, // 1 USD = 1.36 CAD
  INR: 83.20, // 1 USD = 83.20 INR
};

type CurrencyCode = keyof typeof CONVERSION_RATES;

export interface PriceDisplay {
  amount: number;
  currency: CurrencyCode;
  formatted: string;
}

export function getLocalCurrency(country?: string): CurrencyCode {
  if (!country) return 'USD';
  
  switch (country) {
    case 'US': return 'USD';
    case 'CA': return 'CAD';
    case 'IN': return 'INR';
    default: return 'USD';
  }
}

export function formatPrice(
  amountInUSD: number,
  currency: CurrencyCode = 'USD',
  showCurrencyCode: boolean = true
): string {
  const convertedAmount = amountInUSD * CONVERSION_RATES[currency];
  
  const formatter = new Intl.NumberFormat(getLocaleFromCurrency(currency), {
    style: 'currency',
    currency,
    currencyDisplay: showCurrencyCode ? 'symbol' : 'narrowSymbol',
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
  });
  
  return formatter.format(convertedAmount);
}

export function getLocaleFromCurrency(currency: CurrencyCode): string {
  switch (currency) {
    case 'USD': return 'en-US';
    case 'CAD': return 'en-CA';
    case 'INR': return 'en-IN';
    default: return 'en-US';
  }
}

export function getPriceDetails(amountInUSD: number, country?: string): PriceDisplay {
  const currency = getLocalCurrency(country);
  const amount = amountInUSD * CONVERSION_RATES[currency];
  const formatted = formatPrice(amountInUSD, currency);
  
  return {
    amount,
    currency,
    formatted
  };
}

// Calculate early bird discount price
export function getDiscountedPrice(originalPrice: number, discountPercentage: number, country?: string): PriceDisplay {
  const discountedAmountUSD = originalPrice * (1 - (discountPercentage / 100));
  return getPriceDetails(discountedAmountUSD, country);
}