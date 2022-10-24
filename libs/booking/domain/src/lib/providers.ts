// libs/booking/domain/src/lib/domain.providers.ts

import { importProvidersFrom } from "@angular/core";
import { EffectsModule, provideEffects } from "@ngrx/effects";
import { provideState, StoreModule } from "@ngrx/store";
import { BookingEffects } from "./+state/effects";
import { bookingFeature } from "./+state/reducers";
import { FlightClassEffects } from './+state/flight-class/flight-class.effects';
import { FLIGHTCLASS_FEATURE_KEY, reducer } from './+state/flight-class/flight-class.reducer';

export function provideBookingDomain() {
    return [
        // importProvidersFrom(StoreModule.forFeature(bookingFeature)),
        // importProvidersFrom(EffectsModule.forFeature([BookingEffects
        provideState(bookingFeature),
        provideEffects([BookingEffects]),
    ];
}
