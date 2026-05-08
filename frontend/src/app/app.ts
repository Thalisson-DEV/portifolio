import { Component, OnInit, AfterViewInit, inject, ElementRef, ViewChildren, QueryList, PLATFORM_ID, ChangeDetectorRef, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    FooterComponent, 
    HomeComponent, 
    AboutComponent, 
    ProjectsComponent, 
    ContactComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-[#050f07] text-[#f9fafb] font-mono selection:bg-[#22c55e]/30 selection:text-[#22c55e] overflow-x-hidden">
      
      <app-navbar 
        class="z-50" 
        [activeSection]="activeSection()"
        (sectionChange)="onSectionChange($event)">
      </app-navbar>

      <main class="flex-grow w-full relative flex flex-col">
        
        <section id="hello" #section>
          <app-home></app-home>
        </section>

        <section id="about" #section class="section-content">
          <app-about></app-about>
        </section>

        <section id="projects" #section class="section-content">
          <app-projects></app-projects>
        </section>

        <section id="contact" #section class="section-content">
          <app-contact></app-contact>
        </section>

      </main>

      <app-footer></app-footer>

    </div>
  `
})
export class App implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  
  activeSection = signal('hello');

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  onSectionChange(id: string) {
    this.activeSection.set(id);
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      threshold: 0.2, // Sensibilidade aumentada
      rootMargin: '-80px 0px -20% 0px' // Ajuste para compensar o header
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
          
          if (entry.target.classList.contains('section-content')) {
            entry.target.classList.add('visible');
          }
          
          // Força a atualização em ambiente Zoneless
          this.cdr.detectChanges();
        }
      });
    }, options);

    this.sections.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }
}