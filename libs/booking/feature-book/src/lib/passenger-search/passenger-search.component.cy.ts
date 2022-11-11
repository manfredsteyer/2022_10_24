import { PassengerSearchComponent } from './passenger-search.component';
import { HttpClientModule } from '@angular/common/http';
import { createPassenger, Passenger } from '@nx-example/booking/domain';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { PassengerStore } from './passenger.store';

it('should search for passengers', () => {
  const max = createPassenger({ firstName: 'Max' });
  const passengerStore = {
    passengers$: new BehaviorSubject<Passenger[]>([]),
    search() {
      this.called = true;
      this.passengers$.next([max]);
    },
    called: false,
  };

  // cy.intercept('GET', 'http://www.angular.at/api/passenger?name=', {
  //   body: [],
  // });
  cy.mount(PassengerSearchComponent, {
    providers: [{ provide: PassengerStore, useValue: passengerStore }],
  });
  cy.get('[data-testid="ps-search"]').click();
  cy.get('.card-header').then(() => {
    expect(passengerStore.called).to.eq(true);
  });
});
