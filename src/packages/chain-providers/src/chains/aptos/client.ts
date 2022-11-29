import {Resource, ResourceCoin, ResourceType} from './model';

export class Client {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getBalance(address: string): Promise<Resource<ResourceCoin>> {
    return fetch(this.url + '/v1/accounts/' + address + '/resources')
      .then(res => res.json())
      .then((resource: Resource<ResourceCoin>[]) => {
        return resource.filter(el => el.type === ResourceType.COIN)[0];
      });
  }
}
