// All requests are made from this file. When making requests from React page components,
//  we only use the exported functions from this file.

import client from './client';
// Import queries
import { statsGlobalQuery } from './queries';

export async function reqStatsGlobal() {
  const {
    data: { statsGlobal },
  } = await client.query({ query: statsGlobalQuery });
  return statsGlobal;
}
