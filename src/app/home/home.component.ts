import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { DataService } from '../services/cat.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteComponent } from '../components/auto-complete/auto-complete.component';

interface CatBreed {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    AutoCompleteComponent,
  ],
  providers: [DataService],
})
export class HomeComponent {
  catBreeds: any;
  isLoading = false;
  selectedCat: CatBreed | null = null;
  filteredCatBreeds: CatBreed[] = [];
  resetAutocomplete = false;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.fetchCatBreeds();
  }
  handleSelection(selectedBreed: any) {
    console.log('Selected Breed:', selectedBreed);
    this.selectedCat = selectedBreed;
    this.filterCatBreeds(selectedBreed);
    this.resetAutocomplete = false;
  }
  filterCatBreeds(value: string): void {
    const filterValue = value.toLowerCase();
    if (filterValue === '') {
      this.filteredCatBreeds = this.catBreeds;
    } else {
      this.filteredCatBreeds = this.catBreeds.filter((option: CatBreed) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
    console.log('Filtered Cat Breeds:', this.filteredCatBreeds);
  }

  clearSelection(): void {
    this.selectedCat = null;
    this.filteredCatBreeds = this.catBreeds;
    this.resetAutocomplete = true;
    setTimeout(() => (this.resetAutocomplete = false), 0);
  }

  fetchCatBreeds(): void {
    this.isLoading = true;
    this.dataService.getCatBreeds().subscribe({
      next: (data: CatBreed[]) => {
        this.catBreeds = data;
        this.filteredCatBreeds = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
        this.isLoading = false;
      },
    });
  }
}
