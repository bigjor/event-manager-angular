import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _appService: AppService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._router.navigate(['/login'], { relativeTo: this._route });
    this._appService.rmvItem('user')
    this._appService.setLogged(false)
  }

  isLogged(): boolean {
    return this._appService.isLogged()
  }

  test() {
    this._appService.idbExecMethod('createEvent', {
      title: 'prueba2',
      description: 'preuba',
      color: '#ff0000',
      date: 'Tue Jan 12 2021 00:00:00 GMT+0100 (hora estándar de Europa central)'
    })
  }

  addEvent(): void {
    this._router.navigate(['/event'], { relativeTo: this._route });
  }
}
