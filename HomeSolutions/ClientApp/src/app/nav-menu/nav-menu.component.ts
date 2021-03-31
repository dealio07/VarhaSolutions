import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public routes: Route[] = [
    {
      name: 'Investment',
      link: '/investment',
    },
    {
      name: 'Item catalog',
      link: '/item-catalog',
    },
  ];

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

interface Route {
  name: string;
  link: string;
  exact?: boolean;
}
