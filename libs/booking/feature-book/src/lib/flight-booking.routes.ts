import { Routes } from '@angular/router';
import { provideBookingDomain } from '@nx-example/booking/domain';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { provideState } from '@ngrx/store';
import { flightSearchFeature } from './+state/flight-search.reducer';
import { provideEffects } from '@ngrx/effects';
import { FlightSearchEffects } from './+state/flight-search.effects';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideBookingDomain(),
      provideState(flightSearchFeature),
      provideEffects([FlightSearchEffects]),
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'flight-search',
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent,
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent,
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
      },
    ],
  },
];

// {
//     provide: INJECTOR_INITIALIZER,
//     multi: true,
//     useValue: () => inject(InitService).init()
// }
