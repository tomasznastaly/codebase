import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() transaction: Transaction;

  get logoUrl() {
    const fileName = this.transaction.merchant.name.replace(/\s+/g, '-').toLowerCase();
    return `/assets/images/icons/${fileName}.png`;
  }
}
