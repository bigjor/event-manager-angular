import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private _appService: AppService) { }

  firstDayOfWeek(year: number, month: number): number {
    let number = new Date(year, month-1, 1).getDay()
    return number == 0 ? 7 : number - 1
  }

  daysInMonth(month: number, year: number): number { 
    return new Date(year, month, 0).getDate();
  }

  isSameDate(dateA: Date, dateB: Date = new Date()): boolean {
    return dateA.toDateString() == dateB.toDateString()
  }

  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  randomColor(): string {
    return '#xxxxxx'.replace(/[x]/g, function(c) {
        let r = Math.random() * 16 | 0, v = r;
        return v.toString(16);
    });
  }

  nextMonth(date: Date) {
    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    let month = null
    let year = null
    
    if (currentMonth == 11) {
        year = currentYear + 1
        month = 0
    } else {
        year = currentYear
        month = currentMonth + 1
    }

    return new Date(year, month, 1)
  }

  prevMonth(date: Date) {
    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    let month = null
    let year = null

    if (currentMonth == 0) {
      year = currentYear - 1
      month = 11
    } else {
      year = currentYear
      month = currentMonth - 1
    }

    return new Date(year, month, 1)
  }

  async getEvents() {
    return await this._appService.idbExecMethod('getEvents');
  }
}
