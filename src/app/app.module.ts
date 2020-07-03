import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppShellModule } from './app-shell/app-shell.module';
import { HttpClientModule } from '@angular/common/http';
import { TimelineModule } from './timeline/timeline.module';
import { ProjectModule } from './project/project.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContactCardModule } from './contact-card/contact-card.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        AppRoutingModule,
        AppShellModule,
        TimelineModule,
        ProjectModule,
        ContactCardModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
