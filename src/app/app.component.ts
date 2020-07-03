import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  hideSidebar: boolean;

  constructor(private router: Router) {
    this.hideSidebar = false;
  }

  private subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(x => {
      if (x instanceof NavigationStart) {
        this.hideSidebar = x.url === '/profile';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
