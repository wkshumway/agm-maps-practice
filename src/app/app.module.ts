import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GMapComponent } from './g-map/g-map.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCL1vvnrzEPTOncGtKkmZCs1SA5nx7XqgU',
      libraries: ["places"],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
