import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { IAlbum, IOptions, IRange } from '../../core/models/breeds.model';
import { BreedsService } from '../../core/providers/breeds.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchFormInit } from './search.form';
import { SEARCH_IMPORTS_CONFIG } from './config';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [...SEARCH_IMPORTS_CONFIG],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  RANGE_CONFIG: IRange = { min: 1, max: 50 };

  private destroyRef = inject(DestroyRef);

  searchForm = SearchFormInit(this.RANGE_CONFIG);

  private isValid = (): boolean => {
    const { breedName, rangeCntrl } = this.searchForm.getRawValue();
    return this.searchForm.valid && !!breedName && rangeCntrl != null;
  };

  @Input() breeds!: IOptions[];

  private breedsService = inject(BreedsService);

  private albumsResponseSignal$ = signal<IAlbum>({ images: [] });

  private rangeValueSignal$ = signal<number | null>(null);

  albumSizeSignal$: Signal<string[]> = computed(() => {
    const response = this.albumsResponseSignal$().images;
    const limit = this.rangeValueSignal$();
    const albumsSize = response.slice(0, limit as number) ?? [];
    console.info('ALBUMS ', albumsSize);
    return albumsSize;
  });

  ngOnInit(): void {
    this.formAction$();
  }

  private formAction$() {
    this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      filter(() => this.isValid()),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap((value) => this.setRangeSignalValue(value)),
      switchMap((value: Partial<{ breedName: string, rangeCntrl: null }>) => this.getByBreed$(value.breedName as string)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (response: IAlbum) => {
        console.info('API RESPONSE ', response);
        this.albumsResponseSignal$.set(response);
      }
    });
  }

  private setRangeSignalValue = (value: Partial<{ breedName: string, rangeCntrl: null }>) =>
    this.rangeValueSignal$.set(value.rangeCntrl ?? 0);


  private getByBreed$ = (breed: string): Observable<IAlbum> => this.breedsService.getByBreed(breed);


}
