import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAlbum, IBreed, IBreedsResponse, IByBreedResponse } from '../models/breeds.model';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BreedsService {

  private http = inject(HttpClient);

  private breedsCache = new ReplaySubject<IBreed[]>(1);

  isLoaded: boolean = false;

  constructor() {

  }

  getAllBreeds$ = (): Observable<IBreed[]> => {
    if (!this.isLoaded) {
      this.http.get<IBreedsResponse>(environment.allBreeds).pipe(
        map((response: IBreedsResponse) => this.findSubBreeds(response))
      ).subscribe(this.breedsCache);
      this.isLoaded = true;
    }
    return this.breedsCache.asObservable();
  };

  private findSubBreeds = (response: IBreedsResponse): IBreed[] => {
    const breedsWithSubBreeds: IBreed[] = Object.entries(response.message)
      .filter(([breed, subBreeds]) => subBreeds.length > 0)
      .map(([breed, subBreeds], index) => ({
        id: index + 1,
        breed: breed,
        subBreeds: subBreeds
      }));
    return breedsWithSubBreeds;
  }

  getByBreed(name: string): Observable<IAlbum> {
    const url = `${environment.byBreed}/${name}/images`;
    return this.http.get<IByBreedResponse>(url).pipe(
      map((response: IByBreedResponse) => ({ images: response.message }))
    );

  }


}
