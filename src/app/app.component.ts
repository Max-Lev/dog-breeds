import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsContainerComponent } from './shared/components/tabs-container/tabs-container.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    TabsContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  
}
