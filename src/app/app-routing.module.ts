import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
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
