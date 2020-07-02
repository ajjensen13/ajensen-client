import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { MarkdownComponent } from '../markdown/markdown.component';
import { AwardComponent } from '../contact-card/awards/award.component';

@NgModule({
  declarations: [
    AppShellComponent,
    HeaderComponent,
    FooterComponent,
    ContactCardComponent,
    MarkdownComponent,
    AwardComponent
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
