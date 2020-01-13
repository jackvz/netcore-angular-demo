import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentComponent } from './incident/incident.component';
import { IncidentAddEditComponent } from './incident-add-edit/incident-add-edit.component';
import { IncidentService } from './incident.service';

@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    IncidentComponent,
    IncidentAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    IncidentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
