import { Injectable } from '@angular/core';
import { Transaction } from './models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { map, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { getTime, formatISO } from 'date-fns';
import { orderBy } from 'lodash';
import { Filters } from './models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactions: Transaction[] = [];
  private transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadJSONtransactions();
  }

  getTransactions(filters: Filters): Observable<Transaction[]> {
    return this.transactions$
      .pipe(
        withLatestFrom([of([...this.transactions])]),
        map(([ts]) => {
          // filtering & sorting transactions should be a backend responsibility, so I fake it here :-)
          const transactions = ts
            .map(t => this.unify(t))
            .filter(t => this.hasKeyword(t, filters.query));

          return this.sort(transactions, filters);
        }),
      );
  }

  addTransaction(transaction: Transaction) {
    this.transactions.unshift(transaction);
    this.transactions$.next(this.transactions);
  }

  private unify(transaction: Transaction): Transaction {
    transaction.transaction.amountCurrency.amount = this.convertAmountToNumber(transaction);
    transaction.dates.valueDate = this.convertDateToTimestamp(transaction);

    return transaction;
  }

  private convertAmountToNumber(transaction: Transaction): number {
    const amountCurrency = transaction.transaction.amountCurrency;
    const isAmountInCents = Number.isInteger(amountCurrency.amount);

    return isAmountInCents ? amountCurrency.amount : Math.round(Number(amountCurrency.amount * 100)) / 100;
  }

  private convertDateToTimestamp(transaction: Transaction): number {
    const dates = transaction.dates;
    const isTimestamp = Number.isInteger(dates.valueDate);

    return isTimestamp ? dates.valueDate : getTime(new Date(dates.valueDate));
  }

  private hasKeyword(t: Transaction, query: string): boolean {
    const description = [t.merchant.name, t.merchant.accountNumber, t.categoryCode, t.transaction.type].join();

    return description.toLowerCase().includes(query.toLowerCase());
  }

  private sort(transactions: Transaction[], filters: Filters): Transaction[] {
    const appliedSorting = [
      {
        sortOrder: filters.dateOrder,
        iterator: (t: Transaction) => formatISO(t.dates.valueDate, { representation: 'date' }),
      },
      {
        sortOrder: filters.beneficiaryOrder,
        iterator: (t: Transaction) => t.merchant.name.toLowerCase(),
      },
      {
        sortOrder: filters.amountOrder,
        iterator: (t: Transaction) => t.transaction.amountCurrency.amount,
      },
    ].filter(def => Boolean(def.sortOrder));

    const iterators = appliedSorting.map(s => s.iterator);
    const orders = appliedSorting.map(s => s.sortOrder as 'asc' | 'desc');

    return orderBy(
      transactions,
      iterators,
      orders,
    );
  }

  private loadJSONtransactions() {
    this.httpClient.get<{ data: Transaction[] }>('./assets/transactions.json')
      .subscribe(file => {
        this.transactions = file.data;
        this.transactions$.next(this.transactions);
      });
  }
}
