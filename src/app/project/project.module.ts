import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { AppShellModule } from '../app-shell/app-shell.module';

@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    AppShellModule
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
