import { Router } from 'express';
import { getMobileSettingById, updateMobileSetting } from '../controllers/mobile-settings';

const msRouter = Router();

msRouter.get('/:id?', getMobileSettingById);
msRouter.put('/', updateMobileSetting);

export { msRouter as mobileSettingsRouter };
