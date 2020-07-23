import { DefaultModule } from './layouts/default/default.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './modules/profile/profile.component';
import { CalendrierComponent } from './modules/calendrier/calendrier.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    CalendrierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DefaultModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
