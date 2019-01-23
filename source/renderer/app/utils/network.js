// @flow
import {
  MAINNET_EXPLORER_URL,
  STAGING_EXPLORER_URL,
  TESTNET_EXPLORER_URL,
  DEVELOPMENT_EKG_URL,
  STAGING_EKG_URL,
  TESTNET_EKG_URL,
} from '../config/urlsConfig';
import environment from '../../../common/environment';

import {
  START_TIME_MAINNET,
  START_TIME_STAGING,
  START_TIME_TESTNET,
  // START_TIME_DEVNET,
  SLOT_DURATION_MAINNET,
  SLOT_DURATION_STAGING,
  SLOT_DURATION_TESTNET,
  SLOT_DURATION_DEVNET,
  EPOCH_LENGTH_BASE_MAINNET,
  EPOCH_LENGTH_BASE_STAGING,
  EPOCH_LENGTH_BASE_TESTNET,
  // EPOCH_LENGTH_BASE_DEVNET,
} from '../config/epochsConfig';

const { isMainnet, isStaging, isTestnet, isDevelopment } = environment;

export const getNetworkExplorerUrl = () => {
  // sets default to mainnet in case env.NETWORK is undefined
  let explorerUrl = MAINNET_EXPLORER_URL;
  if (isMainnet()) { explorerUrl = MAINNET_EXPLORER_URL; }
  if (isStaging()) { explorerUrl = STAGING_EXPLORER_URL; }
  if (isTestnet()) { explorerUrl = TESTNET_EXPLORER_URL; }
  return explorerUrl;
};

export const getNetworkEkgUrl = () => {
  // sets default to development in case env.NETWORK is undefined
  let ekgUrl = DEVELOPMENT_EKG_URL;
  if (isDevelopment()) { ekgUrl = DEVELOPMENT_EKG_URL; }
  if (isStaging()) { ekgUrl = STAGING_EKG_URL; }
  if (isTestnet()) { ekgUrl = TESTNET_EKG_URL; }
  return ekgUrl;
};

const getEpochData = () => {

  if (isDevelopment()) {
    return {
      // startTime: Math.round((developmentStartTime / 1000)),
      // startTime: START_TIME_DEVNET,
      startTime: START_TIME_MAINNET,
      slotDuration: SLOT_DURATION_DEVNET,
      // epochLengthBase: EPOCH_LENGTH_BASE_DEVNET,
      epochLengthBase: EPOCH_LENGTH_BASE_MAINNET,
    };
  } else if (isStaging()) {
    return {
      startTime: START_TIME_STAGING,
      slotDuration: SLOT_DURATION_STAGING,
      epochLengthBase: EPOCH_LENGTH_BASE_STAGING,
    };
  } else if (isTestnet()) {
    return {
      startTime: START_TIME_TESTNET,
      slotDuration: SLOT_DURATION_TESTNET,
      epochLengthBase: EPOCH_LENGTH_BASE_TESTNET,
    };
  }
  return {
    startTime: START_TIME_MAINNET,
    slotDuration: SLOT_DURATION_MAINNET,
    epochLengthBase: EPOCH_LENGTH_BASE_MAINNET,
  };
};

export const getCurrentEpoch = () => {
  const { startTime, epochLengthBase, slotDuration } = getEpochData();
  const currentTimeInUTC = Math.round((new Date()).getTime() / 1000);
  const numberOfSlots = epochLengthBase * slotDuration * 10;
  return Math.round((currentTimeInUTC - startTime) / numberOfSlots);
};
