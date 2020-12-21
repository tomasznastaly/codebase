import { Sorting } from '../../shared/models/sorting.model';

export interface Filters {
  query: string;
  dateOrder: Sorting;
  beneficiaryOrder: Sorting;
  amountOrder: Sorting;
}
