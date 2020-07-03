import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectComponent } from './project/project.component';
import { ContactCardComponent } from './contact-card/contact-card.component';

const routes: Routes = [
  { path: 'profile', component: ContactCardComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: '', redirectTo: 'timeline', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
