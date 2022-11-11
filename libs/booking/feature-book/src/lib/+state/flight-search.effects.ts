import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { flightSearchActions } from './flight-search.actions';
import { FlightService } from '@nx-example/booking/domain';
import { map, switchMap } from 'rxjs';

@Injectable()
export class FlightSearchEffects {
  actions$ = inject(Actions);
  flightService = inject(FlightService);
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flightSearchActions.search),
      switchMap((action) => this.flightService.find(action.from, action.to)),
      map((flights) => flightSearchActions.searched({ flights }))
    )
  );
}
