import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// VIEWS
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { EventComponent } from './views/event/event.component';
import { AuthGuard } from './guards/auth.guard';
// ROUTES
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'event/:id', component: EventComponent, canActivate: [AuthGuard]},
  {path: 'event', component: EventComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
