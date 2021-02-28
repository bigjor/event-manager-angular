import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarComponent } from './views/calendar/calendar.component';

// MATERIAL
import { MaterialModule } from './material-module';
import { AppService } from './app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatDatePipe } from './views/calendar/format-date.pipe';
import { EventComponent } from './views/event/event.component';

@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CalendarComponent,
    FormatDatePipe,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MODULES
    FormsModule,
    ReactiveFormsModule,

    // MATERIAL
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _appService: AppService) {
    this.checkLogin()
  }

  checkLogin(): void {
    let user = this._appService.getItem('user')
    if (user) this._appService.setLogged(true)
  }
}
