import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-submit-btn',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './submit-btn.component.html'
})
export class SubmitBtnComponent {

  @Output() submitEmitter = new EventEmitter<void>();

  @Input() isLoading: boolean = false;

  @Input() disabled: boolean = false;

  submitAction = () => this.submitEmitter.emit();
  

}
