import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCatBreeds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cats/breeds`);
  }
  getImagesByBreedId(breedId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cats/breeds/${breedId}/images`);
  }
  getCatBreedsWithImages(): Observable<any> {
    return this.getCatBreeds().pipe(
      switchMap((breeds) => {
        const requests = breeds.map((breed: any) =>
          this.getImagesByBreedId(breed.id).pipe(
            map((images: any) => {
              breed.images = images;
              return breed;
            })
          )
        );
        return forkJoin(requests);
      })
    );
  }
}
