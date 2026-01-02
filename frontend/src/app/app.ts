import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { CommonModule } from '@angular/common';
import { fadeAnimation } from './animations'; // <--- Importe sua animação de volta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <div class="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      
      <app-navbar class="z-50"></app-navbar>

      <main class="flex-grow w-full relative flex flex-col">
        
        <div class="animation-wrapper flex-grow" [@routeAnimations]="prepareRoute(outlet)"> 
          <router-outlet #outlet="outlet"></router-outlet>
        </div>

      </main>

      <app-footer></app-footer>

    </div>
  `,
  animations: [fadeAnimation]
})
export class App {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}