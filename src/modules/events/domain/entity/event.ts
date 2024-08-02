// import { Ticket } from "./ticket";
import { Ticket } from "../../../tickets/domain/entity/tickets";
// 
export interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  description: string;
  availableTickets: Ticket[];
  createdAt: Date;
  updatedAt: Date;
};
