import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ AppComponent ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers   : [],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
