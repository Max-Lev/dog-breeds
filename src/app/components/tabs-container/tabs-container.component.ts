import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TABS_CONFIG } from './config';

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule
  ],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.scss'
})
export class TabsContainerComponent implements OnInit {
  links = TABS_CONFIG.links;
  activeLink = TABS_CONFIG.activeLink
  background = TABS_CONFIG.background;

  ngOnInit(): void {

  }

}
