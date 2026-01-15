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
      <h2 class="text-3xl font-bold text-white mb-8 text-center"><span class="text-neon-green">03.</span> <span i18n="@@contactTitle">Get In Touch</span></h2>

      <p class="text-gray-400 text-center max-w-xl mx-auto mb-12" i18n="@@contactDesc">
        Currently open to new opportunities as a Junior Developer.
        My inbox is always open!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="bg-terminal-gray p-6 rounded border border-gray-700 h-fit">
            <h3 class="text-white font-mono mb-4" i18n="@@contactInfoTitle">> contact_info</h3>
            <ul class="space-y-4 text-gray-400">
                <li class="flex items-center gap-3 hover:text-neon-green transition">
                    <i class="devicon-github-original" aria-hidden="true"></i>
                    <a href="https://github.com/Thalisson-DEV" target="_blank" class="hover:underline">github.com/Thalisson-DEV</a>
                </li>
                <li class="flex items-center gap-3 hover:text-neon-green transition">
                    <i class="devicon-linkedin-plain" aria-hidden="true"></i>
                    <a href="https://linkedin.com/in/thalisson-damião" target="_blank" class="hover:underline">linkedin.com/in/thalisson-damião</a>
                </li>
            </ul>
        </div>

        <form (ngSubmit)="sendMessage()" class="space-y-4" aria-label="Contact form">
          <div class="relative">
            <label for="name" class="sr-only" i18n="@@contactLabelName">Name</label>
            <input type="text" id="name" [(ngModel)]="form.name" name="name" placeholder="Name" i18n-placeholder="@@contactPlaceholderName" [disabled]="isLoading" autocomplete="name"
                   class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none font-mono disabled:opacity-50"
                   aria-required="true">
          </div>

          <div class="relative">
            <label for="email" class="sr-only" i18n="@@contactLabelEmail">Email</label>
            <input type="email" id="email" [(ngModel)]="form.email" name="email" placeholder="Email" i18n-placeholder="@@contactPlaceholderEmail" [disabled]="isLoading" autocomplete="email"
                   class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none font-mono disabled:opacity-50"
                   aria-required="true">
          </div>

          <div class="relative">
            <label for="message" class="sr-only" i18n="@@contactLabelMessage">Message</label>
            <textarea id="message" [(ngModel)]="form.message" name="message" rows="4" placeholder="Message" i18n-placeholder="@@contactPlaceholderMessage" [disabled]="isLoading"
                      class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none font-mono disabled:opacity-50"
                      aria-required="true"></textarea>
          </div>

          <button type="submit" [disabled]="isLoading"
                  class="w-full py-3 bg-transparent border border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-white transition rounded disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-gray-500">
            <span *ngIf="isLoading" i18n="@@contactButtonSending">Sending Packet...</span>
            <span *ngIf="!isLoading" i18n="@@contactButtonSend">Send Message</span>
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
    if(!this.form.email.includes("@") || !this.form.email.includes(".")) {
      this.setErrorLog("Validation Failed", "Invalid Email");
      return;
    }
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