import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { DropDownControlComponent } from '../../shared/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../shared/size-control/size-control.component';
import { IAlbum, IOptions, IRange } from '../../core/models/breeds.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreedsService } from '../../core/providers/breeds.service';
import { Observable } from 'rxjs';
import { AlbumComponent } from '../album/album.component';
import { SizeErrorsComponent } from '../../shared/size-errors/size-errors.component';
import { crossFieldRequiredValidator } from './custom.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    DropDownControlComponent,
    SizeControlComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    AlbumComponent,
    SizeErrorsComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  RANGE_CONFIG: IRange = { min: 1, max: 50 };

  private destroyRef = inject(DestroyRef);

  searchForm = new FormGroup({
    breedName: new FormControl<string>('', { nonNullable: true }),
    rangeCntrl: new FormControl(null,
      {
        validators: [
          Validators.min(this.RANGE_CONFIG.min),
          Validators.max(this.RANGE_CONFIG.max),
          Validators.required
        ],
        updateOn: 'change'
      })
  });

  
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
    console.log('ALBUM SIZE ', albumsSize);
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
        console.log('API RESPONSE ', response);
        this.albumsResponseSignal$.set(response);
      }
    })
  }


  private setRangeSignalValue(value: Partial<{ breedName: string, rangeCntrl: null }>) {
    this.rangeValueSignal$.set(value.rangeCntrl ?? 0);
  }

  private getByBreed$(breed: string): Observable<IAlbum> {
    return this.breedsService.getByBreed(breed);
  }

  
  
}
