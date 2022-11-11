import { Flight } from '@nx-example/booking/domain';
import { createFeature, createReducer, on } from '@ngrx/store';
import { flightSearchActions } from './flight-search.actions';

export type FlightSearchState = {
  flights: Flight[];
};

const initialState: FlightSearchState = { flights: [] };

export const flightSearchFeature = createFeature({
  name: 'flightSearch',
  reducer: createReducer(
    initialState,
    on(flightSearchActions.searched, (state, action) => {
      const newState = { ...state };
      newState.flights = action.flights;
      return newState;
    })
  ),
});
