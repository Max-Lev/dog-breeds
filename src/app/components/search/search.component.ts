import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { DropDownControlComponent } from '../../form-controls/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../form-controls/size-control/size-control.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    DropDownControlComponent,
    SizeControlComponent,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  
  private destroy$ = new Subject<void>();

  searchForm = new FormGroup({
    breedName: new FormControl(''),
    sizeCntrl: new FormControl(''),
  });

  ngOnInit(): void {

    console.log(this.searchForm);
    this.searchForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log('searchForm ',value);
   });

  }




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
