import { Component } from '@angular/core';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {
  constructor(){
    console.log('AdoptionComponent')
  }
}
