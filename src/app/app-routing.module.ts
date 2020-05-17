import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';


const routes: Routes = [
  { path: '', component: TimelineComponent } as Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
