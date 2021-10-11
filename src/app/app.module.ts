import { ProfileModule } from './profile/profile.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProfileModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
