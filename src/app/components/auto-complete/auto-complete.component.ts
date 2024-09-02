import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface CatBreed {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class AutoCompleteComponent {
  myControl = new FormControl('');
  private _items: CatBreed[] = [];
  @Input() resetInput: boolean = false;
  options: string[] = [];
  filteredOptions: Observable<CatBreed[]> = new Observable<CatBreed[]>();

  @Input() set items(value: CatBreed[]) {
    this._items = value;
    this.setupFilter();
  }

  @Output() selectionChange = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetInput'] && changes['resetInput'].currentValue === true) {
      this.myControl.reset();
    }
  }

  get items(): CatBreed[] {
    return this._items;
  }

  ngOnInit() {
    this.setupFilter();
  }

  setupFilter(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  selectOption(): void {
    this.myControl.valueChanges.subscribe((value) => {
      const selectOption = this.items.find((option) => option.name === value);
      if (selectOption) {
        this.selectionChange.emit(selectOption);
      }
    });
  }

  private _filter(value: string): CatBreed[] {
    const filterValue = value.toLowerCase();
    if (!this.items) {
      return [];
    }

    return this.items.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
