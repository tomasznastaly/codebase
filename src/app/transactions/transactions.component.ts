import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { Transaction } from './models/transaction.model';
import { FiltersService } from './filters.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly filtersService: FiltersService,
    private readonly transactionsService: TransactionsService,
  ) {}

  ngOnInit() {
    this.getTransactions();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getTransactions() {
    const subscription = this.filtersService.filters$.pipe(
      switchMap(filters => this.transactionsService.getTransactions(filters)),
    ).subscribe(transactions => this.transactions = transactions);

    this.subscriptions.add(subscription);
  }
}
