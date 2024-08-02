import 'dotenv/config';

import express, { Request, Response } from 'express';
import { knex } from 'knex';

import dbConfig from './shared/infra/db/knex/knexfile';
import { createEventDAL } from './modules/events/infra/dal/events.dal';
import { createTicketDAL } from './modules/tickets/infra/dal/tickets.dal';
import { createGetEventsController } from './modules/events/infra/controllers/get-events';
import { MobileSettingsRepo } from './modules/mobile-settings/infra/repos/settings';

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

app.use('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

app.use('/mobile-settings', async (req: Request, res: Response) => {
  let id: number = 1;

  try {
    const tempId = parseInt(req.query.id as string);
    if (isNaN(tempId)) throw new Error('ID should be a number');
    id = tempId;
  } catch (err) {
    console.log(`Query param "${id}" not ok. ${err.message}`);
  }

  try {
    const { msg, settingById } = await MobileSettingsRepo.getMobileSettingsById(id);

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
});

app.use('/', async (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started');
});
