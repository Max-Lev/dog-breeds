import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TABS_CONFIG } from './config';
import { Subject, takeUntil } from 'rxjs';

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
export class TabsContainerComponent implements OnInit,OnDestroy {
  
  links = TABS_CONFIG.links;
  activeLink = TABS_CONFIG.activeLink
  background = TABS_CONFIG.background;

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.setActiveTab();
  }

  setActiveTab() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.root;
        let child = currentRoute.firstChild;
        if (child && child.snapshot.url.length) {
          const index = this.links.findIndex(link => link.toLocaleLowerCase() === child.snapshot.url[0].path);
          this.activeLink = this.links[index];
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
