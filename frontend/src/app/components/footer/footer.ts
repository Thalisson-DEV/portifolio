import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="text-center py-4 text-gray-600 font-mono text-sm w-full bg-terminal-black border-t border-gray-900 z-10 relative">
      <p>Built with Coffee☕ by Thalisson</p>
    </footer>
  `
})
export class FooterComponent {}