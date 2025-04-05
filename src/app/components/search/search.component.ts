import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, Input, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { DropDownControlComponent } from '../../shared/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../shared/size-control/size-control.component';
import { IAlbum, IOptions } from '../../core/models/breeds.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreedsService } from '../../core/providers/breeds.service';
import { Observable } from 'rxjs';
import { AlbumComponent } from '../album/album.component';
import { SizeErrorsComponent } from '../../shared/size-errors/size-errors.component';

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
export class SearchComponent implements OnInit, OnChanges, AfterViewInit {

  RANGE_CONFIG = { min: 1, max: 50 };

  private destroy$ = new Subject<void>();

  searchForm = new FormGroup({
    breedName: new FormControl('', { nonNullable: true }),
    rangeCntrl: new FormControl(null,
      [Validators.min(this.RANGE_CONFIG.min), Validators.max(this.RANGE_CONFIG.max)])
  });

  private isValid = () => this.searchForm.valid && 
  !!this.searchForm.value.breedName &&
  !!this.searchForm.value.rangeCntrl;

  private cdRef = inject(ChangeDetectorRef);

  @Input() breeds!: IOptions[];

  private breedsService = inject(BreedsService);

  private albumsResponseSignal$ = signal<IAlbum>({ images: [] });

  private rangeValueSignal$ = signal<number>(this.RANGE_CONFIG.min);

  albumSizeSignal$: Signal<string[]> = computed(() => {
    const response = this.albumsResponseSignal$().images;
    const limit = this.rangeValueSignal$();
    const albumsSize = response.slice(0, limit) ?? [];
    console.log('albumsSize ', albumsSize);
    return albumsSize;
  });

  constructor() {
    effect(() => {
      // console.log('albums$: ', this.albumsResponseSignal$().images);
      // console.log('displayAmount$: ', this.displayAmount$());
      // console.log('filterLenght$: ', this.display$());
    });
  }

  ngOnInit(): void {
    this.addRangeRequiredValidator$();
  }

  ngAfterViewInit(): void {
    this.formAction$();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  private formAction$() {
    this.searchForm.valueChanges.pipe(
      filter(() => this.isValid()),
      debounceTime(1500),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      tap((value) => this.setRangeSignalValue(value)),
      switchMap((value: Partial<{ breedName: string, rangeCntrl: null }>) => this.getByBreed$(value.breedName as string)),
      takeUntil(this.destroy$),
    ).subscribe({
      next: (response: IAlbum) => {
        console.log('response ', response);
        this.albumsResponseSignal$.set(response);
      }
    })
  }


  private setRangeSignalValue(value: Partial<{ breedName: string, rangeCntrl: null }>) {
    this.rangeValueSignal$.set(value.rangeCntrl ?? 0)
  }

  private getByBreed$(breed: string): Observable<IAlbum> {
    return this.breedsService.getByBreed(breed);
  }

  private addRangeRequiredValidator$() {
    this.searchForm.controls.rangeCntrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (this.searchForm.controls.rangeCntrl.dirty) {
        this.searchForm.controls.rangeCntrl.addValidators(Validators.required)
        this.searchForm.controls.rangeCntrl.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
