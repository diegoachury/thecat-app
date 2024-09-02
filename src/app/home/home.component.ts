import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { DataService } from '../services/cat.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AutoCompleteComponent } from '../components/auto-complete/auto-complete.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarouselModule } from 'ngx-owl-carousel-o';

interface CatBreed {
  id: string;
  name: string;
  description: string;
  wikipedia_url: string;
  images: any[];
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
    MatIconModule,
    MatToolbarModule,
    CarouselModule,
  ],
  providers: [DataService],
})
export class HomeComponent {
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    items: 1,
    nav: false,
  };
  catBreeds: any;
  isLoading = false;
  selectedCat: CatBreed | null = null;
  filteredCatBreeds: CatBreed[] = [];
  resetAutocomplete = false;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.fetchCatBreeds();
    console.log('Cat Breeds:', this.catBreeds);
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
    this.dataService.getCatBreedsWithImages().subscribe({
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
