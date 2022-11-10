import { PassengerSearchComponent } from './passenger-search.component';
import { createPassenger, Passenger } from '@nx-example/booking/domain';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PassengerStore } from './passenger.store';

describe('Passenger Search', () => {
  it('should mount', () => {
    cy.mount(PassengerSearchComponent, { imports: [HttpClientModule] });
  });

  it('should set the name field', () => {
    cy.mount('<app-passenger-search name="Hans"></app-passenger-search>', {
      imports: [HttpClientModule, PassengerSearchComponent],
    });
    cy.get('[data-testid=ps-name]').should('have.value', 'Hans');
  });

  it('should stub the PassengerStore', () => {
    const rudolf = createPassenger({ firstName: 'Rudolf', name: 'Gruber' });
    const passengerStore = {
      passengers$: new BehaviorSubject<Passenger[]>([]),
      search() {
        this.passengers$.next([rudolf]);
      },
    };
    cy.mount(PassengerSearchComponent, {
      providers: [{ provide: PassengerStore, useValue: passengerStore }],
    });

    cy.get('[data-testid=ps-name]').clear().type('Gru');
    cy.get('[data-testid=ps-search]').click();
    cy.get('[data-testid=ps-card]')
      .should('have.length', 1)
      .should('contain.text', 'Gruber, Rudolf');
  });

  it('should intercept the network', () => {
    const vanessa = createPassenger({
      firstName: 'Vanessa',
      name: 'Hinterhuber',
    });

    cy.intercept('GET', 'http://www.angular.at/api/passenger?name=Hin', {
      body: [vanessa],
    });
    cy.mount(PassengerSearchComponent, { imports: [HttpClientModule] });

    cy.get('[data-testid=ps-name]').clear().type('Hin');
    cy.get('[data-testid=ps-search]').click();
    cy.get('[data-testid=ps-card]')
      .should('have.length', 1)
      .should('contain.text', 'Hinterhuber, Vanessa');
  });

  it('should upgrade the passenger', () => {
    const sandra = createPassenger({
      firstName: 'Sandra',
      name: 'Birgkamp',
      passengerStatus: 'B',
    });

    cy.intercept('GET', 'http://www.angular.at/api/passenger?name=Bir', {
      body: [sandra],
    });
    cy.mount(PassengerSearchComponent, { imports: [HttpClientModule] });
    cy.get('[data-testid=ps-name]').clear().type('Bir');
    cy.get('[data-testid=ps-search]').click();

    cy.intercept('POST', 'http://www.angular.at/api/passenger').as('request');
    cy.get('[data-testid=pc-upgrade]').click();
    cy.wait('@request')
      .its('request.body')
      .should('have.property', 'passengerStatus', 'A');
  });
});
