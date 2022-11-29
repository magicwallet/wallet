export class Balances {
  balances: Balance[];
}

export class Balance {
  denom: string;
  amount: string;
}

export class BlockResponse {
  block: Block;
}

export class Block {
  header: BlockHeader;
}

export class BlockHeader {
  height: string;
}
