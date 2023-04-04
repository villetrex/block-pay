import { RestClient, RestClientError, RestClientResponse } from '@kingmakers/rest-client';
import { TelemetryClient } from 'applicationinsights';
import upperFirst from 'lodash.upperfirst';

let telemetryClient: TelemetryClient;

if (process.env.NODE_ENV === 'production' && process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  telemetryClient = new TelemetryClient(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING);
}

export const logger = <T extends { new (...args: any[]): any; prototype: { client: RestClient } }>(base: T) => {
  return class extends base {
    constructor(...args: any[]) {
      super(...args);
      if (telemetryClient) {
        this.client.setResponseInterceptors(
          (response: RestClientResponse) => response,
          (error: RestClientError) => {
            const data = { ...error.config?.data };

            if (data?.password) {
              delete data.password;
            }
            telemetryClient.trackException({
              exception: new Error(`${upperFirst(base.name)}Error: ${error.config?.url}`),
              properties: {
                endpoint: `${error.config.baseURL}/${error.config?.url}`,
                httpMethod: error.config?.method,
                httpCode: error.response?.status,
                data,
                params: error.config?.params,
                response: error.response?.data,
              },
            });

            return Promise.reject(error);
          },
        );
      }
    }
  };
};
