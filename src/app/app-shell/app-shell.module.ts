import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MarkdownComponent } from '../markdown/markdown.component';

@NgModule({
  declarations: [
    AppShellComponent,
    HeaderComponent,
    FooterComponent,
    MarkdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AppShellComponent,
    MarkdownComponent
  ]
})
export class AppShellModule { }
