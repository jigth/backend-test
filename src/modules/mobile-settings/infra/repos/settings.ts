import { mongodbDatabase as database } from '../../../../shared/infra/db/mongodb/connection';
import { MobileSetting } from '../../domain/models';
import { DEFAULT_MOBILE_SETTING } from './constants/settings';

export class MobileSettingsRepo {
  private mobileSettings
  private static instance: MobileSettingsRepo;

  private constructor() {
    this.mobileSettings = database.collection('mobile_settings');
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MobileSettingsRepo();
    }
    return this.instance;
  }

  /** Gets the default mobile setting. Creates it if necessary.
   * NOTE: This is a helper method and should only be called from another one that initializes
   * and closes the mongodb client
   */
  private async getDefaultMobileSetting() {
    const defaultClientId = 1;
    let settingById = await this.mobileSettings.findOne({ clientId: defaultClientId });

    if (!settingById) {
      try {
        settingById = await this.mobileSettings.insertOne(DEFAULT_MOBILE_SETTING);

        // Return the default value directly to avoid performing an extra find operation
        return DEFAULT_MOBILE_SETTING;
      } catch (err) {
        throw new Error(err.message);
      }
    }

    return settingById;
  }

  async getClientsIdsWithMobileSettings() {
    try {
      const clientIds = await this.mobileSettings.distinct('clientId');
      return clientIds;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  async getMobileSettingById(clientId: number): Promise<{ msg: string; settingById: any }> {
    let msg = 'ok';

    try {
      let settingById = await this.mobileSettings.findOne({ clientId });

      if (!settingById) {
        msg = `${msg}. ("mobile setting" with clientId ${clientId} not found. Showing default setting)`;
        settingById = await this.getDefaultMobileSetting();
      }

      return {
        msg,
        settingById,
      };
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  async saveMobileSetting(newMobileSetting: MobileSetting): Promise<MobileSetting> {
    try {
      const foundSetting = await this.mobileSettings.findOne({ clientId: newMobileSetting.clientId });

      if (!foundSetting) {
        const updatedSetting = await this.mobileSettings.insertOne(newMobileSetting);
        return updatedSetting;
      }

      const newSetting = await this.mobileSettings.findOneAndUpdate(
        { clientId: foundSetting.clientId },
        { $set: newMobileSetting },
        { returnDocument: 'after', upsert: false },
      );

      return newSetting;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
