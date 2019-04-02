import { Component, Input } from '@angular/core';
import { navItems_Console } from '../../_nav_console';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './console-layout.component.html',
  styleUrls:[
    './console-layout.component.scss'
  ]
})
export class ConsoleLayoutComponent {
  public navItems_Console = navItems_Console;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public username = null;
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

