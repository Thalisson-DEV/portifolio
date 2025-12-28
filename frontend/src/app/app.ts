import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { fadeAnimation } from './animations'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen relative">
      <div [@routeAnimations]="prepareRoute(outlet)"> <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </main>
    <footer class="text-center py-6 text-gray-600 font-mono text-sm relative z-10">
      <p>Built with Coffe☕ by Thalisson</p>
    </footer>
  `,
  animations: [fadeAnimation]
})
export class App {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}