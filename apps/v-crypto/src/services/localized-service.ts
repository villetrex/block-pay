import { ApiConfiguration, RestClient } from '@villetrex/rest-client';
import qs from 'qs';

import { LocaleType } from 'src/services/types';
import { getBrandIdByLocale } from 'src/utils/locales';

export default class LocalizedService {
  client: RestClient;

  constructor(options: ApiConfiguration) {
    this.client = new RestClient(options);

    this.init();
  }

  private init = () => {
    this.client.setRequestInterceptors(request => {
      const { locale, accessToken } = request.data || request.params || {};
      if (request.headers) {
        if (locale) {
          const brandId = getBrandIdByLocale(locale as LocaleType);
          request.headers['x-brand-id'] = brandId;
          request.headers['X-API-BRAND'] = brandId;
        }

        const contentType = request.headers['Content-Type'];

        if (contentType === 'application/x-www-form-urlencoded') {
          request.data = qs.stringify(request.data);
        }

        request.headers.ActivitySource = 'mobileplus'; // TODO
        request.headers['X-API-PLAYSOURCE'] = '1'; // TODO

        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
      if (request.data) {
        delete request.data.locale;
        delete request.data.accessToken;
      }
      if (request.params) {
        delete request.params.locale;
        delete request.params.accessToken;
      }

      return request;
    });
  };
}
