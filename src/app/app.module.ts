import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineProjectComponent } from './timeline/timeline-project.component';
import { TimelineListComponent } from './timeline/timeline-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TimelineRouteComponent } from './timeline/timeline-route.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    TimelineComponent,
    TimelineProjectComponent,
    TimelineListComponent,
    TimelineRouteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    LayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
