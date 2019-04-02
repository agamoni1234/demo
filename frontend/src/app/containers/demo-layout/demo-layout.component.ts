import { Component, Input } from '@angular/core';
import { navItems_Demo } from './../../_nav_demo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './demo-layout.component.html',
  styleUrls:[
    './demo-layout.component.scss'
  ]
})
export class DemoLayoutComponent {
  public navItems_Demo = navItems_Demo;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public username=null;
  constructor() {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.username = localStorage['username'];
  }
}
