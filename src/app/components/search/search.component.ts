import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { DropDownControlComponent } from '../../form-controls/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../form-controls/size-control/size-control.component';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IBreed } from '../../core/models/breeds.model';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    DropDownControlComponent,
    SizeControlComponent,
    ReactiveFormsModule,
    
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  
  private destroy$ = new Subject<void>();

  searchForm = new FormGroup({breedName: new FormControl(''),sizeCntrl: new FormControl('')});

  activatedRoute = inject(ActivatedRoute);

  breeds:IBreed[] = [];

  ngOnInit(): void {

    this.searchForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log('searchForm ',value);
   });

   this.getResolvedData$();

  }

  getResolvedData$() {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe((data:Data) => {
      this.breeds = data['breeds']; 
      console.log(this.breeds);
    });
  }




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
