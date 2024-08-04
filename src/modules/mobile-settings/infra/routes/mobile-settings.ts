import { Router } from 'express';
import { getClientsIdsWithMobileSettings, getMobileSettingById, updateMobileSetting } from '../controllers/mobile-settings';

const msRouter = Router();

msRouter.get('/clients-ids', getClientsIdsWithMobileSettings);
msRouter.get('/:id?', getMobileSettingById);
msRouter.put('/', updateMobileSetting);

export { msRouter as mobileSettingsRouter };
