import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BreedsService } from '../providers/breeds.service';
import { Observable } from 'rxjs';
import { IBreed } from '../models/breeds.model';
import { toSignal } from '@angular/core/rxjs-interop';

export const GetBreedsResolver: ResolveFn<Observable<IBreed[]>> = (route, state) => {
  const breedsService = inject(BreedsService)
  return breedsService.getAllBreeds();
  
};
