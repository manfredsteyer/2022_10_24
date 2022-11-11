import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'luggage',
    loadChildren: () => loadRemoteModule({
      type: 'manifest',
      exposedModule: './routes',
      remoteName: 'luggage'
    }).then(esm => esm.APP_ROUTES)
  },
  {
    path: 'flight-booking',
    loadChildren: () =>
      import('@nx-example/booking/feature-book').then(
        (m) => m.FLIGHT_BOOKING_ROUTES
      ),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('@nx-example/booking/feature-tickets').then(
        (m) => m.TicketsModule
      ),
  },
  {
    path: 'next-flight',
    loadComponent: () => 
      import('@nx-example/booking/feature-tickets')
        .then(m => m.NextFlightComponent)
    // component: NextFlightComponent,
  },
 
];
