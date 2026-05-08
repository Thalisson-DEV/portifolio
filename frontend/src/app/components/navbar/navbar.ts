import { Component, Inject, LOCALE_ID, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 w-full bg-[#050f07]/80 backdrop-blur-xl border-b border-[#22c55e]/10 z-50 h-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex items-center justify-between h-full">

          <div class="flex items-center">
            <span class="text-[#22c55e] font-mono font-bold text-lg md:text-xl cursor-pointer hover:opacity-80 transition-opacity" (click)="scrollTo('hello')">
              <span class="text-gray-600 mr-1">$</span>thalisson.dev<span class="animate-pulse">_</span>
            </span>
          </div>

          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-2 font-mono text-xs tracking-tight">
              @for (item of navItems; track item.id) {
                <a (click)="scrollTo(item.id)"
                   class="relative px-4 py-2 transition-all duration-300 cursor-pointer group"
                   [class.text-[#22c55e]]="activeSection === item.id"
                   [class.text-gray-500]="activeSection !== item.id">

                   <span class="relative z-10 group-hover:text-[#22c55e] transition-colors">
                     {{ item.label }}
                   </span>

                   @if (activeSection === item.id) {
                     <div class="absolute inset-0 bg-[#22c55e]/5 rounded border border-[#22c55e]/20 animate-fade-in"></div>
                     <div class="absolute bottom-[-1px] left-0 w-full h-[1px] bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-width"></div>
                   }
                </a>
              }

              <div class="w-[1px] h-4 bg-gray-800/50 mx-2"></div>

              <button (click)="toggleLanguage()"
                      class="flex items-center gap-2 px-3 py-1.5 rounded border border-gray-800 hover:border-[#22c55e]/30 hover:bg-[#22c55e]/5 transition-all text-[10px] text-gray-500 hover:text-[#22c55e]">
                <span [class.text-[#22c55e]]="currentLang === 'en-US'">EN</span>
                <span class="text-gray-800">|</span>
                <span [class.text-[#22c55e]]="currentLang === 'pt'">PT</span>
              </button>
            </div>
          </div>

          <div class="md:hidden flex items-center gap-4">
            <button (click)="toggleMenu()" class="text-gray-300 hover:text-[#22c55e] focus:outline-none p-2 transition-colors" aria-label="Toggle navigation menu" [attr.aria-expanded]="isOpen">
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
        <div class="md:hidden bg-[#050f07]/95 backdrop-blur-xl border-b border-[#22c55e]/10 absolute w-full left-0 top-16 shadow-2xl animate-fade-in-down">
          <div class="px-4 pt-4 pb-8 space-y-2 font-mono text-sm">
            @for (item of navItems; track item.id) {
              <a (click)="scrollTo(item.id); toggleMenu()"
                 class="flex items-center justify-between px-4 py-4 rounded border border-transparent transition-all"
                 [class.text-[#22c55e]]="activeSection === item.id"
                 [class.bg-[#22c55e]/5]="activeSection === item.id"
                 [class.border-[#22c55e]/10]="activeSection === item.id"
                 [class.text-gray-400]="activeSection !== item.id">
                 <span>{{ item.label }}</span>
                 @if (activeSection === item.id) {
                   <span class="text-[10px] uppercase tracking-widest text-[#22c55e]/50">current</span>
                 }
              </a>
            }

            <div class="pt-6 mt-4 border-t border-gray-800/50 flex justify-center gap-6">
                <button (click)="currentLang !== 'pt' ? null : toggleLanguage()"
                        class="text-xs font-mono uppercase tracking-widest transition-all"
                        [class.text-[#22c55e]]="currentLang !== 'pt'"
                        [class.text-gray-600]="currentLang === 'pt'">en-us</button>
                <div class="w-[1px] h-4 bg-gray-800"></div>
                <button (click)="currentLang === 'pt' ? null : toggleLanguage()"
                        class="text-xs font-mono uppercase tracking-widest transition-all"
                        [class.text-[#22c55e]]="currentLang === 'pt'"
                        [class.text-gray-600]="currentLang !== 'pt'">pt-br</button>
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
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes widthExpand {
      from { width: 0; }
      to { width: 100%; }
    }
    .animate-width {
      animation: widthExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class NavbarComponent {
  @Input() activeSection = 'hello';
  @Output() sectionChange = new EventEmitter<string>();
  isOpen = false;
  currentLang: string;

  navItems = [
    { id: 'hello', label: $localize`:@@navHello:_hello` },
    { id: 'about', label: $localize`:@@navAbout:_about-me` },
    { id: 'projects', label: $localize`:@@navProjects:_projects` },
    { id: 'contact', label: $localize`:@@navContact:_contact-me` }
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

  scrollTo(id: string) {
    this.sectionChange.emit(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
