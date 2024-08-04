// The following dependencies are @ts-ignored because they are used just for mocks.
// @ts-ignore
import { getMobileSettingById } from './mobile-settings';
// @ts-ignore
import { mongodbClient } from '../../../../shared/infra/db/mongodb/connection';

import { vi } from 'vitest';

import { MobileSettingsRepo } from '../repos/settings';
import { DEFAULT_MOBILE_SETTING } from '../repos/constants/settings';

vi.mock('../repos/settings', () => {
  const actual = vi.importActual('../repos/settings');
  return {
    ...actual,
    MobileSettingsRepo: {
      getInstance: vi.fn().mockReturnValue({
        getMobileSettingById: vi.fn(),
      }),
    }
  }
})

vi.mock('../../../../shared/infra/db/mongodb/connection');

it('Should resolve to the default mobile setting when passed 1', async () => {
  // Mock dependencies of the "getMobileSettingById" method
  vi.mock('../../../../shared/infra/db/mongodb/connection', () => ({
    mongodbClient: {
      connect: vi.fn(),
      db: vi.fn().mockReturnValue({
        collection: vi.fn().mockReturnValue({
          findOne: vi.fn().mockResolvedValue({ _id: 1, clientId: 1, moreProperties: 'could go here' }),
        }),
      }),
    },
    mongodbDatabase: {
      collection: vi.fn().mockImplementation(() => {}),
    },
  }));

  const mockRepoInstance = MobileSettingsRepo.getInstance();

  // Mock response of the getMobileSettingById method
  // @ts-ignore
  mockRepoInstance.getMobileSettingById.mockResolvedValueOnce({
    msg: 'ok',
    settingById: DEFAULT_MOBILE_SETTING,
  });

  const { msg, settingById } = await MobileSettingsRepo.getInstance().getMobileSettingById(1);
  expect(msg).toMatch('ok');
  expect(settingById).toMatchObject(DEFAULT_MOBILE_SETTING);
});
