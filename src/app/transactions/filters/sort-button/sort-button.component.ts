import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sorting } from '../../../shared/models/sorting.model';

@Component({
  selector: 'app-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortButtonComponent {
  @Input() label: string;
  @Output() sortDirectionChanged = new EventEmitter<Sorting>();
  currentSorting  = Sorting.NO_SORT;
  readonly sorting = Sorting;

  updateSorting() {
    if (this.currentSorting === Sorting.NO_SORT) {
      this.currentSorting = Sorting.ASC;
    } else if (this.currentSorting === Sorting.ASC) {
      this.currentSorting = Sorting.DESC;
    } else {
      this.currentSorting = Sorting.NO_SORT;
    }

    this.sortDirectionChanged.emit(this.currentSorting);
  }
}
