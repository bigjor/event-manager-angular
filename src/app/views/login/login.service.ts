import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';

type LoginResponse<T extends {}> = {
  logged?: LoginResponse<T>;
  token?: LoginResponse<T>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string = 'http://localhost:3000/login';

  

  constructor(private http: HttpClient, private _appService: AppService) { }

  login(user: User): Observable<LoginResponse<boolean>> {
    return this.http
      .post<LoginResponse<boolean>>(this.endpoint, user)
      .pipe(map(response => {
        if (response.logged && typeof response.logged == 'boolean') {
          this._appService.setItem('user', user.name)
          this._appService.setLogged(response.logged)
        }
        return response.logged
      }))
  }

}
