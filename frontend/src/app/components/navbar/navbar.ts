import { Component, Inject, LOCALE_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, UpperCasePipe],
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
            <div class="ml-10 flex items-center space-x-4 font-mono text-sm">
              @for (item of navItems; track item.path) {
                <a [routerLink]="item.path" 
                   routerLinkActive="text-neon-green border-b-2 border-neon-green"
                   [routerLinkActiveOptions]="{exact: true}"
                   class="text-gray-300 hover:text-neon-green px-3 py-2 transition-colors duration-200 cursor-pointer">
                   {{ item.label }}
                </a>
              }
              
              <div class="w-[1px] h-6 bg-gray-800 mx-2"></div>

              <button (click)="toggleLanguage()"
                      class="group relative flex items-center justify-center h-10 w-10 rounded-lg 
                             transition-all duration-300 cursor-pointer text-gray-400 hover:text-white hover:bg-white/10">
                  <svg class="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="absolute bottom-1 right-1 text-[8px] font-bold font-mono bg-neon-green text-black px-1 rounded-sm leading-none">
                    {{ currentLang | uppercase }}
                  </span>
              </button>
            </div>
          </div>

          <div class="md:hidden flex items-center gap-4">
            <button (click)="toggleMenu()" class="text-gray-300 hover:text-white focus:outline-none p-2" aria-label="Toggle navigation menu" [attr.aria-expanded]="isOpen">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                @if (!isOpen) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                } @else {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      @if (isOpen) {
        <div class="md:hidden bg-[#0a0a0a] border-b border-gray-800 absolute w-full left-0 top-16 shadow-2xl animate-fade-in-down">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-mono">
            @for (item of navItems; track item.path) {
              <a [routerLink]="item.path" 
                 (click)="toggleMenu()"
                 routerLinkActive="text-neon-green bg-gray-900"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-300 hover:text-neon-green hover:bg-gray-800 block px-3 py-4 rounded-md text-base font-medium border-l-4 border-transparent hover:border-neon-green transition-all">
                 {{ item.label }}
              </a>
            }

            <div class="border-t border-gray-800/50 mt-4 pt-8 pb-10">
              <div class="flex items-center justify-center gap-8">
                <a href="/" 
                   class="flex flex-col items-center gap-2 transition-all duration-300"
                   [class.opacity-100]="currentLang !== 'pt'"
                   [class.opacity-30]="currentLang === 'pt'">
                  <span class="text-xs font-bold font-mono tracking-[0.2em]">EN-US</span>
                  @if (currentLang !== 'pt') {
                    <div class="w-1 h-1 rounded-full bg-neon-green shadow-[0_0_10px_#2ea043]"></div>
                  }
                </a>

                <div class="w-[1px] h-10 bg-gray-800"></div>

                <a href="/pt/" 
                   class="flex flex-col items-center gap-2 transition-all duration-300"
                   [class.opacity-100]="currentLang === 'pt'"
                   [class.opacity-30]="currentLang !== 'pt'">
                  <span class="text-xs font-bold font-mono tracking-[0.2em]">PT-BR</span>
                  @if (currentLang === 'pt') {
                    <div class="w-1 h-1 rounded-full bg-neon-green shadow-[0_0_10px_#2ea043]"></div>
                  }
                </a>
              </div>
            </div>
          </div>
        </div>
      }
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
  currentLang: string;

  navItems = [
    { path: '/', label: $localize`:@@navHello:_hello` },
    { path: '/about', label: $localize`:@@navAbout:_about-me` },
    { path: '/projects', label: $localize`:@@navProjects:_projects` },
    { path: '/contact', label: $localize`:@@navContact:_contact-me` }
  ];

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.currentLang = (locale === 'pt' || locale === 'pt-BR') ? 'pt' : 'en-US';
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleLanguage() {
    if (this.currentLang === 'pt') {
      window.location.href = '/';
    } else {
      window.location.href = '/pt/';
    }
  }
}
