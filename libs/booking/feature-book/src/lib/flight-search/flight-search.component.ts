import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlightCardComponent } from '@nx-example/booking/ui-common';
import { CityValidator } from '@nx-example/shared/util-common';
import { FlightSearchStore } from './flight-search.store';
import { FlightFilter, FlightFilterStore } from './flight-filter.store';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    CityValidator,
    ReactiveFormsModule,
  ],
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  from = 'Berlin';
  to = 'London';
  urgent = false;

  store = inject(FlightSearchStore);
  flights$ = this.store.flights$;

  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };

  selectedFilter = new FormControl({});
  selectFilters$ = this.store.selectFilters$;

  search() {
    if (!this.from || !this.to) return;

    this.store.search(this.from, this.to);
  }

  delay(): void {
    throw new Error('not yet implemented');
  }
}
