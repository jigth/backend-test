import { Request } from 'express';

export function getEventsParams(req: Request): { limit: number } {
  let limit = 50

  // Limit query param validation
  try {
    if (isNaN(parseInt(req.query?.limit as string))) {
      throw new Error('Limit should be a number');
    }
    limit = parseInt(req.query?.limit as string);
  } catch (e: unknown) {
    console.log(`Couldn't get limit from query params, using ${limit} as default`);
  }

  return {
    limit,
  }
}
