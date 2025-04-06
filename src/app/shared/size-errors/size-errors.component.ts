import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-size-errors',
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule
  ],
  templateUrl: './size-errors.component.html',
  styleUrl: './size-errors.component.scss'
})
export class SizeErrorsComponent implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  @Input( {required:false}) RANGE_CONFIG!:{ min: number, max: number };

  @Input( {required:true}) control?: AbstractControl | null;

  @Input({required:false}) parentForm?: FormGroup | null;

  @Input({ required: false }) formSubmitted = false;


}
