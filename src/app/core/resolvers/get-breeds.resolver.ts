import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BreedsService } from '../providers/breeds.service';
import { Observable } from 'rxjs';
import { IOptions } from '../models/breeds.model';

export const GetBreedsResolver: ResolveFn<Observable<IOptions[]>> = (route, state) => {
  const breedsService = inject(BreedsService)
  return breedsService.getAllBreeds$();

};
