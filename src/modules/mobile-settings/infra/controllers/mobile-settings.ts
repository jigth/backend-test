import { Request, Response } from 'express';
import { MobileSettingsRepo } from '../repos/settings';
import { MobileSetting } from '../../domain/models/index';
import { validateNewMobileSetting } from './validation/settingsValidation';

export const getMobileSettingById = async (req: Request, res: Response) => {
  let id: number = 1;

  try {
    const tempId = parseInt(req.params.id as string);
    if (isNaN(tempId)) throw new Error('ID should be a number');
    id = tempId;
  } catch (err) {
    console.log(`Route param "${id}" not ok. ${err.message}`);
  }

  try {
    const { msg, settingById } = await MobileSettingsRepo.getMobileSettingById(id);

    res.send({
      msg, //: settingById ? 'ok' : `ok (result not found. id=${id})`,
      data: settingById,
    });
  } catch (err) {
    console.log('err', err.message);
    res.send({
      msg: 'Error',
      err: `Error while retrieving mobile settings data by id ${id} ${err.message}`,
    });
    return;
  }
}

export const updateMobileSetting = async (req: Request, res: Response) => {
  const newSetting: MobileSetting = req.body;

  try {
    validateNewMobileSetting(newSetting);
    const newMobileSetting = await MobileSettingsRepo.saveMobileSetting(newSetting);

    return res.send({
      msg: 'ok',
      data: newMobileSetting,
    });
  } catch (err) {
    console.log('Validation error', err.message);
    return res.send({ msg: 'Validation error', error: err.message });
  }
}