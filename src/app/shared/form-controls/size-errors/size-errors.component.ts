import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-size-errors',
  standalone: true,
  imports: [
    NgIf,
    MatInputModule
  ],
  templateUrl: './size-errors.component.html',
  styleUrl: './size-errors.component.scss'
})
export class SizeErrorsComponent {

  @Input({ required: false }) RANGE_CONFIG!: { min: number, max: number };

  @Input({ required: true }) control?: AbstractControl | null;

  @Input({ required: false }) parentForm?: FormGroup | null;

}
