// libs/booking/domain/src/lib/domain.providers.ts

import { importProvidersFrom } from "@angular/core";
import { EffectsModule, provideEffects } from "@ngrx/effects";
import { provideState, StoreModule } from "@ngrx/store";
import { BookingEffects } from "./+state/effects";
import { bookingFeature } from "./+state/reducers";

export function provideBookingDomain() {
    return [
        // NGRX: Booking -- Feature Slice
        // importProvidersFrom(StoreModule.forFeature(bookingFeature)),
        // importProvidersFrom(EffectsModule.forFeature([BookingEffects])),
        
        provideState(bookingFeature),
        provideEffects([BookingEffects]),
    
    ];
}

//  @Injectable({providedIn: 'root' })
