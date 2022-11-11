import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
    standalone: true,
    selector: 'app-navbar-cmp',
    templateUrl: './navbar.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        MatToolbarModule,
        MatIconModule
    ]
})
export class NavbarComponent {
    isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        @Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver) {
    }
}
