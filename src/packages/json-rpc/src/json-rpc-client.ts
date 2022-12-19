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

    console.log(JSON.stringify(body));
    const result = await fetch(this.url + '/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = (await result.json()) as JSONRPCResponse<T>;

    return data.result;
  }
}
