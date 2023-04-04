import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import RestClient from '.';

const responseData = {
  data: {},
  status: 200,
  headers: {},
  statusText: undefined,
};

const config = {
  baseURL: 'https://google.com',
  endpoint: 'google',
  accessToken: '',
  headers: {},
};

const configWithStubData = {
  ...config,
  stubResponse: responseData.data,
};

describe('RestClient', () => {
  let mock: MockAdapter;
  let client: RestClient;

  beforeAll(() => {
    mock = new MockAdapter(axios);
    client = new RestClient(config);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('get', () => {
    it('success', async () => {
      mock.onGet().reply(200, responseData.data);

      const result = await client.get({ path: '' });

      expect(result).toEqual(responseData.data);
    });
    it('fail', async () => {
      mock.onGet().networkErrorOnce();
      await expect(client.get({ path: '' })).rejects.toThrow();
    });

    it('stub', async () => {
      mock.onGet().timeoutOnce();
      const result = await client.get({ path: '', config: configWithStubData });

      expect(result).toEqual(responseData.data);
    });
  });
  describe('post', () => {
    it('success', async () => {
      mock.onPost().reply(200, responseData.data);
      const result = await client.post({ path: '' });

      expect(result).toEqual(responseData.data);
    });
    it('fail', async () => {
      mock.onPost().networkErrorOnce();

      await expect(client.post({ path: '' })).rejects.toThrow();
    });
    it('stub', async () => {
      mock.onPost().timeoutOnce();
      const result = await client.post({ path: '', config: configWithStubData });

      expect(result).toEqual(responseData.data);
    });
  });
  describe('put', () => {
    it('success', async () => {
      mock.onPut().reply(200, responseData.data);

      const result = await client.put({ path: '' });

      expect(result).toEqual(responseData.data);
    });
    it('fail', async () => {
      mock.onPut().networkErrorOnce();
      await expect(client.put({ path: '' })).rejects.toThrow();
    });
    it('stub', async () => {
      mock.onPut().timeoutOnce();
      const result = await client.put({ path: '', config: configWithStubData });

      expect(result).toEqual(responseData.data);
    });
  });
  describe('patch', () => {
    it('success', async () => {
      mock.onPatch().reply(200, responseData.data);
      const result = await client.patch({ path: '' });

      expect(result).toEqual(responseData.data);
    });
    it('fail', async () => {
      mock.onPatch().networkErrorOnce();

      await expect(client.patch({ path: '' })).rejects.toThrow();
    });
    it('stub', async () => {
      mock.onPatch().timeoutOnce();
      const result = await client.patch({ path: '', config: configWithStubData });

      expect(result).toEqual(responseData.data);
    });
  });
});
