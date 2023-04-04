import { LocaleType } from 'src/services/types';

export const getCurrencySymbol = (locale: LocaleType) => {
  switch (locale) {
    case 'en-ng':
      return '₦';
    case 'en-za':
      return 'R';
    case 'en-ke':
      return 'KSh';
    case 'en-gh':
      return 'GH₵';
  }
};
