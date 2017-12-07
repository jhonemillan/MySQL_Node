import { CountriesService } from './countries.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
