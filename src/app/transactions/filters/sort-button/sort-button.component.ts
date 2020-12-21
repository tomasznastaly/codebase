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
  readonly sorting = Sorting;
}
