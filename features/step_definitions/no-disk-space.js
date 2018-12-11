import { Given, When, Then } from 'cucumber';

let diskSpaceRequired;
const hundredTb = 100 * 1e+12; // 100 TB | unit: bytes
const NO_DISK_SPACE_COMPONENT = '.NoDiskSpaceErrorOverlay_component';

Given(/^I set the required space to 100 TB$/, () => diskSpaceRequired = hundredTb);

When(/^I check the disk space$/, async function () {
  await this.client.executeAsync((diskRequired, done) => {
    daedalus.stores.networkStatus.onCheckDiskSpace({}, diskRequired)
      .then(done)
      .catch((error) => done(error));
  }, diskSpaceRequired);
});

Then(/^The No Disk Space overlay should be (hidden|visible)$/, function (state) {
  const waitForHidden = state === 'hidden';
  return this.client.waitForVisible(NO_DISK_SPACE_COMPONENT, null, waitForHidden);
});
