import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters } from './models/filters.model';
import { Sorting } from '../shared/models/sorting.model';

export const defaultFilters: Filters = {
  amountOrder: Sorting.ASC,
  beneficiaryOrder: Sorting.ASC,
  dateOrder: Sorting.DESC,
  query: '',
};

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filtersSource = new BehaviorSubject<Filters>(defaultFilters);

  readonly filters$ = this.filtersSource.asObservable();

  update(filters: Filters) {
    this.filtersSource.next(filters);
  }
}
