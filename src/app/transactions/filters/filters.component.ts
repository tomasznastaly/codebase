import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Sorting } from '../../shared/models/sorting.model';
import { defaultFilters, FiltersService } from '../filters.service';
import { Subscription } from 'rxjs';
import { Filters } from '../models/filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  filtersForm: FormGroup;
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filtersService: FiltersService,
  ) {}

  ngOnInit() {
    this.buildFilters();
    this.emitFilters();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get queryControl() {
    return this.filtersForm.get('query') as FormControl;
  }

  clear() {
    this.filtersForm.get('query')?.patchValue('');
  }

  updateFilters(sorting: Sorting, field: string) {
    this.filtersForm.get(field)?.patchValue(sorting);
  }

  private buildFilters() {
    this.filtersForm = this.formBuilder.group({
      query: '',
      dateOrder: defaultFilters.dateOrder,
      beneficiaryOrder: defaultFilters.beneficiaryOrder,
      amountOrder: defaultFilters.amountOrder,
    });
  }

  private emitFilters() {
    const subscription = this.filtersForm.valueChanges
      .subscribe((filters: Filters) => this.filtersService.update(filters));

    this.subscriptions.add(subscription);
  }
}
