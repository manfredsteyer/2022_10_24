import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { map, shareReplay } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-sidebar-cmp',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [

        // Angular 15:
        RouterLink, // <button routerLink="">
        RouterLinkWithHref, // <a routerLink="">

        AsyncPipe,

        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
    ],})
export class SidebarComponent {
    isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        @Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver) {
    }
}
