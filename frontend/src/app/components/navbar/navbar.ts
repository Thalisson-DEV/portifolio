import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="fixed top-0 w-full bg-terminal-gray/95 backdrop-blur-md border-b border-gray-800 z-50 h-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex items-center justify-between h-full">
          
          <div class="flex items-center">
            <span class="text-neon-green font-mono font-bold text-lg md:text-xl cursor-pointer" routerLink="/">
              &lt;Thalisson-Dev /&gt;
            </span>
          </div>
          
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4 font-mono text-sm">
              <a *ngFor="let item of navItems" 
                 [routerLink]="item.path" 
                 routerLinkActive="text-neon-green border-b-2 border-neon-green"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-300 hover:text-neon-green px-3 py-2 transition-colors duration-200 cursor-pointer">
                 {{ item.label }}
              </a>
            </div>
          </div>

          <div class="md:hidden flex items-center">
            <button (click)="toggleMenu()" class="text-gray-300 hover:text-white focus:outline-none p-2">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path *ngIf="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path *ngIf="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="isOpen" class="md:hidden bg-terminal-gray border-b border-gray-800 absolute w-full left-0 top-16 shadow-2xl animate-fade-in-down">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-mono">
          <a *ngFor="let item of navItems" 
             [routerLink]="item.path" 
             (click)="toggleMenu()"
             routerLinkActive="text-neon-green bg-gray-900"
             [routerLinkActiveOptions]="{exact: true}"
             class="text-gray-300 hover:text-neon-green hover:bg-gray-800 block px-3 py-4 rounded-md text-base font-medium border-l-4 border-transparent hover:border-neon-green transition-all">
             {{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .animate-fade-in-down {
      animation: fadeInDown 0.3s ease-out;
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class NavbarComponent {
  isOpen = false;

  navItems = [
    { path: '/', label: '_hello' },
    { path: '/about', label: '_about-me' },
    { path: '/projects', label: '_projects' },
    { path: '/contact', label: '_contact-me' }
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}