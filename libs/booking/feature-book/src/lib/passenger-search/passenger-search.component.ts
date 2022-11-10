import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PassengerStore } from './passenger.store';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PassengerCardComponent } from '@nx-example/booking/ui-common';
import { Passenger } from '@nx-example/booking/domain';

@Component({
  standalone: true,
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    PassengerCardComponent,
  ],
  providers: [PassengerStore],
})
export class PassengerSearchComponent {
  formGroup = inject(NonNullableFormBuilder).group({
    name: [''],
  });
  store = inject(PassengerStore);
  passengers$ = this.store.passengers$;

  search(): void {
    this.store.search(this.formGroup.controls.name.getRawValue());
  }

  downgrade(passenger: Passenger) {
    this.store.downgrade(passenger);
  }

  upgrade(passenger: Passenger) {
    this.store.upgrade(passenger);
  }
}
