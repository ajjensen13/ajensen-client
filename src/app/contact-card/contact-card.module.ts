import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactCardComponent } from './contact-card.component';
import { AwardComponent } from './award/award.component';

@NgModule({
  declarations: [
    ContactCardComponent,
    AwardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContactCardComponent
  ]
})
export class ContactCardModule { }
