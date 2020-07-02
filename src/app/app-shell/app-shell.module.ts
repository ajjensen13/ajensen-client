import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ContactCardComponent } from '../contact-card/contact-card.component';

@NgModule({
  declarations: [
    AppShellComponent,
    HeaderComponent,
    FooterComponent,
    ContactCardComponent
  ],
  imports: [
      CommonModule,
      RouterModule,
  ],
  exports: [
    AppShellComponent
  ]
})
export class AppShellModule { }
