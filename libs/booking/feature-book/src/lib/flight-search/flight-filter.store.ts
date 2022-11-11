import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export type FlightFilter = { from: string; to: string };

export type LocalState = {
  filters: FlightFilter[];
};

@Injectable()
export class FlightFilterStore extends ComponentStore<LocalState> {
  constructor() {
    super({ filters: [] });
  }
}
