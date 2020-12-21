import { TransactionMetadata } from './transaction-metadata.model';
import { Dates } from './dates.model';
import { Merchant } from './merchant.model';

export interface Transaction {
  categoryCode: string;
  dates: Dates;
  transaction: TransactionMetadata;
  merchant: Merchant;
}
