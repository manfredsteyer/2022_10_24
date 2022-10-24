import { Component, OnInit } from '@angular/core';
import { UpgradeTicketFacade } from '@nx-example/upgrade/domain';

@Component({
  selector: 'upgrade-upgrade-ticket',
  templateUrl: './upgrade-ticket.component.html',
  styleUrls: ['./upgrade-ticket.component.scss'],
})
export class UpgradeTicketComponent implements OnInit {
  ticketList$ = this.upgradeTicketFacade.ticketList$;

  constructor(private upgradeTicketFacade: UpgradeTicketFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.upgradeTicketFacade.load();
  }
}
