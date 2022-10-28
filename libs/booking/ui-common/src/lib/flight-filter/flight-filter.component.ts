import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightFilter } from '@nx-example/booking/domain';
import { map, Observable, tap } from 'rxjs';


export interface LocalState {
  filters: FlightFilter[];
}

export const initialLocalState: LocalState = {
  filters: []
};


@Component({
  selector: 'flight-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css'],
  providers: [
    ComponentStore
  ]
})
export class FlightFilterComponent {
  @Input() set filter(filter: FlightFilter) {
    this.filterForm.setValue(filter);
  }
  @Output() searchTrigger = new EventEmitter<FlightFilter>();
  filterForm = this.fb.nonNullable.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    urgent: [false]
  });

  selectedFilter = new FormControl(this.filterForm.getRawValue(), { nonNullable: true });

  /**
   * Updater
   */

  addFilter = this.localStore.updater(
    (state: LocalState, filter: FlightFilter) => ({
      ...state,
      filters: [
        ...state.filters.filter(f => !(
          f.from === filter.from &&
          f.to === filter.to
        )),
        filter
      ]
    })
  );

  /**
   * Selectors
   */

  selectFilters$ = this.localStore.select(
    // Selectors

    // Projector
    state => state.filters
  );

  selectLatestFilters$ = this.localStore.select(
    // Selectors
    this.selectFilters$,
    // Projector
    filters => filters.slice(-1)[0]
  );

  /**
   * Effect
   */

  updateFilterForm = this.localStore.effect(
    (filter$: Observable<FlightFilter>) =>
      filter$.pipe(
        tap(filter => this.filterForm.patchValue(filter))
      )
  );

  updateSelectedFilter = this.localStore.effect(
    (filter$: Observable<FlightFilter>) =>
      filter$.pipe(
        tap((filter: FlightFilter) => this.selectedFilter.setValue(filter))
      )
  );

  triggerSearch = this.localStore.effect(
    (trigger$: Observable<void>) =>
      trigger$.pipe(
        map(() => this.filterForm.getRawValue()),
        tap((filter: FlightFilter) => this.addFilter(filter)),
        tap((filter: FlightFilter) => this.searchTrigger.next(filter))
      )
  );

  constructor(
    private fb: FormBuilder,
    private localStore: ComponentStore<LocalState>) {

    this.localStore.setState(initialLocalState);
    this.updateFilterForm(this.selectedFilter.valueChanges);
    this.updateSelectedFilter(this.selectLatestFilters$);
  }
}
