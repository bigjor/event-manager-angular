import { Injectable } from '@angular/core';
import { IdbService } from './storage/idb.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  logged: boolean = false;

  constructor(private _idbService: IdbService) { }

  setLogged(value: boolean): void {
    this.logged = value
  }

  isLogged(): boolean {
    return this.logged
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  getItem(key: string): string {
    return localStorage.getItem(key)
  }

  rmvItem(key: string): void {
    localStorage.removeItem(key)
  }

  idbExecMethod(method, ...args): void | object {
    this._idbService.exec(method, ...args)
  }

}
