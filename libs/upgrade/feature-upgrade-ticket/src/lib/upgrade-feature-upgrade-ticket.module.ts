import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeDomainModule } from '@nx-example/upgrade/domain';
import { UpgradeTicketComponent } from './upgrade-ticket.component';

@NgModule({
  imports: [CommonModule, UpgradeDomainModule],
  declarations: [UpgradeTicketComponent],
  exports: [UpgradeTicketComponent],
})
export class UpgradeFeatureUpgradeTicketModule {}
