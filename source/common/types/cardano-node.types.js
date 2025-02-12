// @flow
export type TlsConfig = {
  hostname: string,
  port: number,
  ca: Uint8Array,
  cert: Uint8Array,
  key: Uint8Array,
};

export type CardanoNodeImplementations = 'cardano' | 'jormungandr' | 'selfnode';

export const CardanoNodeImplementationOptions: {
  CARDANO: CardanoNodeImplementations,
  JORMUNGANDR: CardanoNodeImplementations,
  SELFNODE: CardanoNodeImplementations,
} = {
  CARDANO: 'cardano',
  JORMUNGANDR: 'jormungandr',
  SELFNODE: 'selfnode',
};

export type NetworkNames =
  | 'mainnet'
  | 'staging'
  | 'testnet'
  | 'development'
  | 'itn_rewards_v1'
  | 'selfnode'
  | string;

export type PlatformNames = 'win32' | 'linux' | 'darwin' | string;

export const NetworkNameOptions = {
  mainnet: 'mainnet',
  staging: 'staging',
  testnet: 'testnet',
  development: 'development',
  itn_rewards_v1: 'itn_rewards_v1',
  selfnode: 'selfnode',
};

export type CardanoNodeState =
  | 'starting'
  | 'running'
  | 'exiting'
  | 'stopping'
  | 'stopped'
  | 'updating'
  | 'updated'
  | 'crashed'
  | 'errored'
  | 'unrecoverable';

export const CardanoNodeStates: EnumMap<string, CardanoNodeState> = {
  STARTING: 'starting',
  RUNNING: 'running',
  EXITING: 'exiting',
  STOPPING: 'stopping',
  STOPPED: 'stopped',
  UPDATING: 'updating',
  UPDATED: 'updated',
  CRASHED: 'crashed',
  ERRORED: 'errored',
  UNRECOVERABLE: 'unrecoverable',
};

export type CardanoPidOptions =
  | 'mainnet-PREVIOUS-CARDANO-PID'
  | 'staging-PREVIOUS-CARDANO-PID'
  | 'testnet-PREVIOUS-CARDANO-PID'
  | 'development-PREVIOUS-CARDANO-PID'
  | 'itn_rewards_v1-PREVIOUS-CARDANO-PID'
  | 'selfnode-PREVIOUS-CARDANO-PID'
  | string;

export type CardanoNodeStorageKeys = {
  PREVIOUS_CARDANO_PID: CardanoPidOptions,
};

export type CardanoNodeProcessNames =
  | 'cardano-node'
  | 'cardano-node.exe'
  | 'jormungandr'
  | 'jormungandr.exe'
  | 'local-cluster'
  | 'local-cluster.exe';

export type ProcessNames = {
  CARDANO_PROCESS_NAME: CardanoNodeProcessNames,
};

export const CardanoProcessNameOptions: {
  [CardanoNodeImplementations]: {
    win32: CardanoNodeProcessNames,
    linux: CardanoNodeProcessNames,
    darwin: CardanoNodeProcessNames,
  },
} = {
  cardano: {
    win32: 'cardano-node.exe',
    linux: 'cardano-node',
    darwin: 'cardano-node',
  },
  jormungandr: {
    win32: 'jormungandr.exe',
    linux: 'jormungandr',
    darwin: 'jormungandr',
  },
  selfnode: {
    win32: 'local-cluster.exe',
    linux: 'local-cluster',
    darwin: 'local-cluster',
  },
};

/**
 * Expected fault injection types that can be used to tell
 * cardano-node to behave faulty (useful for testing)
 */
export type FaultInjection =
  | 'FInjIgnoreShutdown'
  | 'FInjIgnoreAPI'
  | 'FInjApplyUpdateNoExit'
  | 'FInjApplyUpdateWrongExitCode';

export const FaultInjections: {
  IgnoreShutdown: FaultInjection,
  IgnoreApi: FaultInjection,
  ApplyUpdateNoExit: FaultInjection,
  ApplyUpdateWrongExitCode: FaultInjection,
} = {
  IgnoreShutdown: 'FInjIgnoreShutdown',
  IgnoreApi: 'FInjIgnoreAPI',
  ApplyUpdateNoExit: 'FInjApplyUpdateNoExit',
  ApplyUpdateWrongExitCode: 'FInjApplyUpdateWrongExitCode',
};

export type FaultInjectionIpcResponse = Array<FaultInjection>;
export type FaultInjectionIpcRequest = [FaultInjection, boolean];

export type CardanoStatus = {
  isNodeResponding: boolean,
  isNodeSyncing: boolean,
  isNodeInSync: boolean,
  hasBeenConnected: boolean,
  cardanoNodePID: number,
  cardanoWalletPID: number,
};

// Cardano Mainet network magic
export const MAINNET_MAGIC = [1, null];

// Cardano Byron Testnet network magic
export const TESTNET_MAGIC = [1097911063, 0];

// Cardano Byron Testnet network magic
export const ITN_MAGIC = 1;

// Cardano Mainnet Candidate during the Shelley HF
export const SHELLEY_TESTNET_NETWORK_ID = [1, 0, null];

// Cardano Staging network magic
export const STAGING_MAGIC = [633343913, 1];

// Cardano Selfnode network magic
export const SELFNODE_MAGIC = MAINNET_MAGIC;
