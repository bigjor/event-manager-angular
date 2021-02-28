import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = { name: '', pass: '' };
  hide: boolean = true;
  remember: boolean = false;

  constructor(
    private _snackBar: MatSnackBar, 
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    window['app'] = this
    
    this.user = this._loginService.isRemembered();
    if (this.user.name || this.user.pass) {
      this.remember = true;
    }
  }

  onError(error: string): void {
    this._snackBar.open(error, '', {
      panelClass: ['mat-primary'],
      duration: 3000
    });
  }

  login() {
    this._loginService.remember(this.user, this.remember)
    this._loginService.login(this.user).subscribe(
      value => {
        console.log("Login:", value)
        if (value) this._router.navigate(['/calendar'], { relativeTo: this._route });
      },
      error => {
        let msg = typeof error?.error?.error == 'string' 
                    ? `Error: ${error?.error?.error}` 
                    : typeof error?.error == 'string' 
                      ? `Error: ${error?.error}` : 'Error no identificado'
        this.onError(msg)
      }
    );
  }
}
