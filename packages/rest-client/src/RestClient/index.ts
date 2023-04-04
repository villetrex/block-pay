import { Agent } from 'https';

import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { errorLogger, requestLogger, responseLogger } from 'axios-logger';
import axiosRetry from 'axios-retry';

// Add this package for caching : https://www.npmjs.com/package/axios-cache-adapter

type RequestConfig<R> = {
  headers?: AxiosRequestHeaders;
  stubResponse?: R;
  timeout?: number;
};

export type RestClientResponse = AxiosResponse;

export type RestClientRequest = AxiosRequestConfig;

export type ApiConfiguration = {
  endpoint: string;
  retries?: number;
  verbose?: boolean;
} & Omit<RestClientRequest, 'url'>;

type MethodParams<P, R> = {
  path: string;
  params?: P;
  config?: RequestConfig<R>;
};

export type RestClientError = AxiosError;

const DEFAULT_TIMEOUT = 10 * 1000;

export default class RestClient {
  private readonly client: AxiosInstance;

  private readonly endpoint: string;

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
    this.endpoint = apiConfiguration.endpoint;

    this.init(apiConfiguration);
  }

  private init({ retries, verbose }: ApiConfiguration) {
    if (retries) {
      this.setRetries(retries);
    }

    this.setLoggerResponse({ verbose });
    this.setLoggerRequest();
  }

  private setRetries = (retries: number) => {
    axiosRetry(this.client, { retries });
  };

  private setLoggerRequest = () => {
    this.client.interceptors.request.use(request => {
      return requestLogger(request, {
        prefixText: `${this.endpoint} API Request`,
      });
    });
  };

  private setLoggerResponse = ({ verbose = false }: { verbose?: boolean }) => {
    this.client.interceptors.response.use(
      response => {
        return responseLogger(response, {
          prefixText: `${this.endpoint} API Response`,
          data: verbose,
        });
      },
      error => {
        return errorLogger(error, {
          prefixText: `${this.endpoint} API Error`,
        });
      },
    );
  };

  private createAxiosClient = ({
    baseURL,
    responseType,
    timeout,
    headers: globalHeaders,
    httpsAgent,
  }: ApiConfiguration): AxiosInstance => {
    return Axios.create({
      baseURL,
      responseType: responseType ?? 'json',
      headers: {
        'Content-Type': 'application/json',
        ...globalHeaders,
      },
      timeout: timeout ?? DEFAULT_TIMEOUT,
      httpsAgent: httpsAgent ?? new Agent({ keepAlive: true }),
    });
  };

  private async handleError<TData>(error: unknown, data?: TData) {
    if (data) {
      return data;
    }

    throw error;
  }

  async get<TParams, TResponse>({ path, params, config }: MethodParams<TParams, TResponse>): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path, {
        params,
        ...config,
      });

      return response.data;
    } catch (error) {
      return this.handleError<TResponse>(error, config?.stubResponse);
    }
  }

  async post<TRequest, TResponse>({ path, params, config }: MethodParams<TRequest, TResponse>): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, params, config);

      return response.data;
    } catch (error) {
      return this.handleError<TResponse>(error, config?.stubResponse);
    }
  }

  async patch<TRequest, TResponse>({ path, params, config }: MethodParams<TRequest, TResponse>): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, params, config);

      return response.data;
    } catch (error) {
      return this.handleError<TResponse>(error, config?.stubResponse);
    }
  }

  async put<TRequest, TResponse>({ path, params, config }: MethodParams<TRequest, TResponse>): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, params, config);

      return response.data;
    } catch (error) {
      return this.handleError<TResponse>(error, config?.stubResponse);
    }
  }

  async delete<TRequest, TResponse>({ path, config }: MethodParams<TRequest, TResponse>): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(path, config);

      return response.data;
    } catch (error) {
      return this.handleError<TResponse>(error, config?.stubResponse);
    }
  }

  public setRequestInterceptors = (
    onFulfilled: (request: RestClientRequest) => Promise<RestClientRequest> | RestClientRequest,
    onRejected?: (error: any) => any | Promise<any>,
  ) => {
    this.client.interceptors.request.use(onFulfilled, onRejected);
  };

  public setResponseInterceptors = (
    onFulfilled: (response: RestClientResponse) => Promise<RestClientResponse> | RestClientResponse,
    onRejected?: (error: any) => any | Promise<any>,
  ) => {
    this.client.interceptors.response.use(onFulfilled, onRejected);
  };
}
