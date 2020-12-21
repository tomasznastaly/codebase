import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransferComponent } from './transfer/transfer.component';
import { FiltersComponent } from './filters/filters.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortButtonComponent } from './filters/sort-button/sort-button.component';


@NgModule({
  declarations: [TransactionsComponent, TransferComponent, FiltersComponent, ListItemComponent, SortButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TransactionsModule { }
