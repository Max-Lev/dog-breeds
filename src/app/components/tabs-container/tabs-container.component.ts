import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TABS_CONFIG } from './config';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule,
    CommonModule
  ],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.scss'
})
export class TabsContainerComponent implements OnInit {

  links = TABS_CONFIG.links;

  activeLink = TABS_CONFIG.activeLink

  background = TABS_CONFIG.background;

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setActiveTab();
  }

  setActiveTab() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.root;
        let child = currentRoute.firstChild;
        if (child && child.snapshot.url.length) {
          const linkIndex = this.links.findIndex(link => link.toLocaleLowerCase() === child.snapshot.url[0].path);
          this.activeLink = this.links[linkIndex];
        }
      }
    });
  }



}
