import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAlbum, IBreed, IBreedsResponse, IByBreedResponse, IOptions } from '../models/breeds.model';
import { catchError, map, Observable, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BreedsService {

  private http = inject(HttpClient);

  private breedsCache = new ReplaySubject<IOptions[]>(1);

  isLoaded: boolean = false;

  getAllBreeds$ = (): Observable<IOptions[]> => {
    if (!this.isLoaded) {
      this.http.get<IBreedsResponse>(environment.allBreeds).pipe(
        map((response: IBreedsResponse) => this.findSubBreeds(response))
      ).subscribe(this.breedsCache);
      this.isLoaded = true;
    }
    return this.breedsCache.asObservable();
  };

  private findSubBreeds = (response: IBreedsResponse): IOptions[] => {
    const breedsWithSubBreeds: IBreed[] = Object.entries(response.message)
      .filter(([breed, subBreeds]) => subBreeds.length > 0)
      .map(([breed, subBreeds], index) => ({
        id: index + 1,
        name: breed,
        subBreeds: subBreeds
      }));
    return breedsWithSubBreeds;
  }

  getByBreed(name: string): Observable<IAlbum> {

    const url = `${environment.byBreed}/${name}/images`;

    return this.http.get<IByBreedResponse>(url).pipe(
      catchError((err) => {
        console.log(err);
        throw new Error(err);
      }),
      map((response: IByBreedResponse) => ({ images: response.message }))
    );

  }


}
