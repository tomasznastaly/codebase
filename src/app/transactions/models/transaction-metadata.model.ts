import { AmountCurrency } from './amount-currency.model';

export enum CreditDebitIndicator {
  DBIT = 'DBIT',
  CRDT = 'CRDT',
}

export enum TransactionType {
  SALARIES = 'salaries',
  CARD_PAYMENT = 'Card Payment',
  ONLINE_TRANSFER = 'Online Transfer',
  TRANSACTION = 'Transaction',
}

export interface TransactionMetadata {
  amountCurrency: AmountCurrency;
  type: TransactionType;
  creditDebitIndicator: CreditDebitIndicator;
}
