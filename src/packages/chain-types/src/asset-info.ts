export class AssetInfo {
  name: string;
  symbol: string;
  decimals: number;

  constructor(name: string, symbol: string, decimals: number) {
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
  }
}
