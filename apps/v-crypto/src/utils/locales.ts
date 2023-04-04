import { LocaleType, MAP_LOCALE_TO_BRAND_ID } from 'src/services/types';

export const getBrandIdByLocale = (locale: LocaleType) => MAP_LOCALE_TO_BRAND_ID[locale];
