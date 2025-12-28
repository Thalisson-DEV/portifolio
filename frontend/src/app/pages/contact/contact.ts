import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

interface RestException {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  template: `
    <div class="pt-24 pb-12 px-4 max-w-4xl mx-auto text-center md:text-left">
      <h2 class="text-3xl font-bold text-white mb-8 text-center"><span class="text-neon-green">03.</span> Get In Touch</h2>
      
      <p class="text-gray-400 text-center max-w-xl mx-auto mb-12">
        Atualmente estou aberto a novas oportunidades como Desenvolvedor Júnior. 
        Minha caixa de entrada está sempre aberta!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="bg-terminal-gray p-6 rounded border border-gray-700 h-fit">
            <h3 class="text-white font-mono mb-4">> contact_info</h3>
            <ul class="space-y-4 text-gray-400">
                <li class="flex items-center gap-3 hover:text-neon-green transition">
                    <i class="devicon-github-original"></i> github.com/Thalisson-DEV
                </li>
                <li class="flex items-center gap-3 hover:text-neon-green transition">
                    <i class="devicon-linkedin-plain"></i> linkedin.com/in/thalisson-damião
                </li>
                <li class="flex items-center gap-3 hover:text-neon-green transition">
                    <span>✉️</span> thalissondamiao1@gmail.com
                </li>
            </ul>
        </div>

        <form (ngSubmit)="sendMessage()" class="space-y-4">
          <input type="text" [(ngModel)]="form.name" name="name" placeholder="Name" [disabled]="isLoading"
                 class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none font-mono disabled:opacity-50">
          
          <input type="email" [(ngModel)]="form.email" name="email" placeholder="Email" [disabled]="isLoading"
                 class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none font-mono disabled:opacity-50">
          
          <textarea [(ngModel)]="form.message" name="message" rows="4" placeholder="Message" [disabled]="isLoading"
                    class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none font-mono disabled:opacity-50"></textarea>
          
          <button type="submit" [disabled]="isLoading"
                  class="w-full py-3 bg-transparent border border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-white transition rounded disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-gray-500">
            {{ isLoading ? 'Sending Packet...' : 'Send Message' }}
          </button>
        </form>
      </div>

      <div *ngIf="logMessage" class="mt-8 bg-black p-4 rounded font-mono text-sm text-left border border-gray-800 shadow-lg animate-fade-in">
        <p class="text-neon-green mb-2">➜  ~ POST /api/contact</p>
        <p [ngClass]="isError ? 'text-red-500' : 'text-gray-300'" class="whitespace-pre-wrap leading-relaxed">{{ logMessage }}</p>
      </div>
    </div>
  `
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };
  logMessage = '';
  isError = false;
  isLoading = false;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef 
  ) {}

  sendMessage() {
    if(!this.form.name || !this.form.email || !this.form.message) {
        this.setErrorLog("Validation Failed", "All fields are required locally.");
        return;
    }

    this.isLoading = true;
    this.isError = false;
    this.logMessage = `> Sending packet to server...`;

    this.contactService.sendMessage(this.form)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); 
        })
      )
      .subscribe({
        next: (response: any) => {
          this.isError = false;
          const msg = response.message || "Email sent successfully!";
          this.logMessage = `{ status: 200, message: "${msg}" }`;

          setTimeout(() => {
             this.form = { name: '', email: '', message: '' };
             this.cdr.detectChanges();
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.isError = true;
          console.error('API Error:', err);

          if (err.error && typeof err.error === 'object' && err.error.timestamp) {
              const apiError = err.error as RestException;
              this.logMessage = `{
  "timestamp": "${apiError.timestamp}",
  "status": ${apiError.status},
  "error": "${apiError.error}",
  "path": "${apiError.path}"
}`;
          } else {
              this.logMessage = `{
  "status": ${err.status},
  "error": "${err.statusText || 'Unknown Error'}",
  "detail": "Unexpected response structure."
}`;
          }
          this.cdr.detectChanges(); 
        }
      });
  }

  private setErrorLog(title: string, detail: string) {
    this.isError = true;
    this.logMessage = `{
  "error": "${title}",
  "detail": "${detail}"
}`;
  }
}