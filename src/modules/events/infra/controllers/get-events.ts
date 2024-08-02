import { Request, Response } from "express";
import { EventDAL } from "../dal/events.dal"
import { TicketsDAL } from "../../../tickets/infra/dal/tickets.dal";
import { getEventsParams } from "./validation/eventsValiation";

export const createGetEventsController = ({
  eventsDAL,
  ticketsDAL,
}: {
  eventsDAL: EventDAL;
  ticketsDAL: TicketsDAL
}) => async (req: Request, res: Response) => {
  
  let { limit } = getEventsParams(req);

  const events = await eventsDAL.getEvents(limit);
  
  // add the available tickets to the response for each event
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const tickets = await ticketsDAL.getTicketsByEvent(event.id);
    events[i].availableTickets = tickets.filter(ticket => ticket.status === 'available');
  }
  res.json(events);
};
