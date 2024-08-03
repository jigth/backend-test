import 'dotenv/config';

import express from 'express';
import { knex } from 'knex';

import dbConfig from './shared/infra/db/knex/knexfile';
import { createEventDAL } from './modules/events/infra/dal/events.dal';
import { createTicketDAL } from './modules/tickets/infra/dal/tickets.dal';
import { createGetEventsController } from './modules/events/infra/controllers/get-events';
import { mobileSettingsRouter } from './modules/mobile-settings/infra/routes/mobile-settings'

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

// Middleware
app.use(express.json());

app.use('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

app.use('/mobile-settings', mobileSettingsRouter);

app.use('/', async (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started');
});
