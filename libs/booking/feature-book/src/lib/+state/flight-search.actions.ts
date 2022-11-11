import { createActionGroup, props } from '@ngrx/store';
import { Flight } from '@nx-example/booking/domain';

export const flightSearchActions = createActionGroup({
  source: 'Flight Search',
  events: {
    Search: props<{ from: string; to: string }>(),
    Searched: props<{ flights: Flight[] }>(),
  },
});
