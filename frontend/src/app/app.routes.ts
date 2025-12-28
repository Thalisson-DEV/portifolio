import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'about', component: AboutComponent, data: { animation: 'About' } },
  { path: 'projects', component: ProjectsComponent, data: { animation: 'Projects' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'Contact' } },
  { path: '**', redirectTo: '' }
];