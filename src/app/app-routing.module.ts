import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  { path: '', component: TimelineComponent } as Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
