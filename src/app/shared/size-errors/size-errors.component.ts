import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
export class SizeErrorsComponent {

  @Input( {required:true}) RANGE_CONFIG!:{ min: number, max: number };

  @Input( {required:true}) control?: AbstractControl | null;

}
