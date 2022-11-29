export class SyncInfo {
  latest_block_height: number;
}

export class NodeInfo {
  sync_info: SyncInfo;
}

export class Balance {
  free: string;
  frozen: string;
  locked: string;
  symbol: string;
}

export class Account {
  balances: [Balance];
}
