import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Flight, FlightService } from '@nx-example/booking/domain';
import { Observable, switchMap, tap } from 'rxjs';

export type FlightFilter = { from: string; to: string };

export type FlightSearchState = {
  flights: Flight[];
  filters: FlightFilter[];
};

@Injectable({ providedIn: 'root' })
export class FlightSearchStore extends ComponentStore<FlightSearchState> {
  flightService = inject(FlightService);
  constructor() {
    super({ flights: [], filters: [] });
  }

  readonly flights$: Observable<Flight[]> = this.select(
    (state) => state.flights
  );

  readonly flightCount$: Observable<number> = this.select(
    (state) => state.flights.length
  );

  #search = this.effect((params$: Observable<{ from: string; to: string }>) => {
    return params$.pipe(
      tap((filter) => this.addFilter({ from: filter.from, to: filter.to })),
      switchMap((param) => this.flightService.find(param.from, param.to)),
      tap((flights: Flight[]) => this.#setFlights(flights))
    );
  });

  addFilter = this.updater((state, filter: FlightFilter) => ({
    ...state,
    filters: [...state.filters, filter],
  }));

  selectFilters$ = this.select((state) => state.filters);

  search(from: string, to: string) {
    this.#search({ from, to });
  }

  #setFlights(flights: Flight[]) {
    this.patchState(() => ({ flights }));
  }
}
