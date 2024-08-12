import { Knex } from 'knex';
import { Event } from '../../domain/entity/event';

export interface EventDAL {
  getEvents(limit: number): Promise<Event[]>;
}

export const createEventDAL = (knex: Knex): EventDAL => {
  return {
    async getEvents(limit): Promise<Event[]> {
      // NOTE: Original code, left here for documentation purposes and for easy comparison between original and optimized
      //  approach to fetching events data with tickets.
      // return await knex<Event>('events').select('*').limit(limit);

      // NOTE: This is the optimized solution, about 10x faster than the original one.
      return await knex<Event>('events as e')
        .leftJoin('tickets as t', 'e.id', 't.event_id')
        .select(
          'e.id',
          'e.name',
          'e.description',
          'e.location',
          'e.date',
          'e.created_at',
          'e.updated_at',
          knex.raw(`
              COALESCE(
                  json_agg(
                      json_build_object(
                          'id', t.id,
                          'event_id', t.event_id,
                          'status', t.status,
                          'type', t.type,
                          'price', t.price,
                          'created_at', TO_CHAR(t.created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MSZ'),
                          'updated_at', TO_CHAR(t.updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')
                      ) ORDER BY t.id
                  ) FILTER (WHERE t.status = 'available'), '[]'
              ) AS "availableTickets"
          `),
        )
        .groupBy('e.id')
        .orderBy('e.id')
        .limit(limit);
    },
  };
};
