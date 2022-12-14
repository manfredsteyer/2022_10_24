import { Routes } from "@angular/router";
import { provideBookingDomain } from "@nx-example/booking/domain";
import { FlightBookingComponent } from "./flight-booking.component";
import { FlightEditComponent } from "./flight-edit/flight-edit.component";
import { FlightSearchComponent } from "./flight-search/flight-search.component";
import { PassengerSearchComponent } from "./passenger-search/passenger-search.component";

export const FLIGHT_BOOKING_ROUTES: Routes = [{
    path: '',
    component: FlightBookingComponent,
    providers: [
        provideBookingDomain()
    ],
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'flight-search'
        },
        {
            path: 'flight-search',
            component: FlightSearchComponent
        },
        {
            path: 'passenger-search',
            component: PassengerSearchComponent
        },
        {
            path: 'flight-edit/:id',
            component: FlightEditComponent
        }
    ]
}];







// {
//     provide: INJECTOR_INITIALIZER,
//     multi: true,
//     useValue: () => inject(InitService).init()
// }
