import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  BookingSlice,
  delayFlight,
  Flight,
  FlightService,
  loadFlights,
  selectFlights,
} from '@nx-example/booking/domain';
import { firstValueFrom, take } from 'rxjs';

import { FlightCardComponent } from '@nx-example/booking/ui-common';
import { CityValidator } from '@nx-example/shared/util-common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FlightCardComponent, CityValidator],
  providers: [],
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  from = 'Berlin';
  to = 'London';
  urgent = false;

  flightService = inject(FlightService);
  flights: Flight[] = [];

  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };

  async search() {
    if (!this.from || !this.to) return;

    this.flights = await firstValueFrom(
      this.flightService.find(this.from, this.to)
    );
  }

  delay(): void {
    throw new Error('not yet implemented');
  }
}
