import {JSONRPCResponse} from './model';

export class JSOPRPCClient {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async call<T>(method: string, params: any): Promise<T> {
    const body = {
      id: '1',
      jsonrpc: '2.0',
      method: method,
      params: params,
    };
    return fetch(this.url + '/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then((value: JSONRPCResponse<T>) => {
        return value.result;
      });
  }
}
