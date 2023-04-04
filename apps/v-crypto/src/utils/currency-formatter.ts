type Options = {
  currency: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

export const LOCALE_CURRENCY_MAP: Record<string, Options> = {
  'en-ng': {
    currency: 'NGN',
  },
  'en-za': {
    currency: 'ZAR',
  },
  'en-ke': {
    currency: 'KES',
  },
  'en-gh': {
    currency: 'GHS',
  },
};

export const formatPriceToCurrencyString = ({ locale, value }: { locale: string; value: number }) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    ...LOCALE_CURRENCY_MAP[locale],
  });
  return formatter.format(value);
};
