import { EventDAL } from "../dal/events.dal";
import { Request, Response } from "express";
import { TicketsDAL } from "../dal/tickets.dal";
import { getEventsParams } from "../validation/controllers/eventsValiation";

export const createGetEventsController = ({
  eventsDAL,
  ticketsDAL,
}: {
  eventsDAL: EventDAL;
  ticketsDAL: TicketsDAL
}) => async (req: Request, res: Response) => {
  
  console.log('test', req.query?.limit ?? '50')

  let { limit } = getEventsParams(req);

  // try {
  //   console.log("enter limit")
  //   if (isNaN(parseInt(req.query?.limit as string))) {
  //     throw new Error('Limit should be a number')
  //   }
  //   limit = parseInt(req.query?.limit as string)
  // } catch (e: unknown) {
  //   console.log('enter catch')
  //   console.log(`Couldn't get limit from query params, using ${limit} as default`)
  // }

  // const limit = parseInt(req.query?.limit as string ?? '50')
  const events = await eventsDAL.getEvents(limit);
  //add the available tickets to the response for each event
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const tickets = await ticketsDAL.getTicketsByEvent(event.id);
    events[i].availableTickets = tickets.filter(ticket => ticket.status === 'available');
  }
  res.json(events);
};
