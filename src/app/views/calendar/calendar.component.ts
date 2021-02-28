import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Event } from 'src/app/models/event';
import { IdbService } from 'src/app/storage/idb.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

    events: Event[] = [];
    today: Date = new Date(Date.now())
    current: Date = this.today
    selected: Date = this.getSelectedDay()
    eventSelected = null
    newEvents = null

    constructor(private _calendarService: CalendarService, private _idbService: IdbService) {
        
    }

    ngOnInit(): void {
        window['app'] = this
        this.loadEvents()
    }

    firstDayOfWeek(): number {
        return this._calendarService.firstDayOfWeek(this.selected.getFullYear(), this.selected.getMonth()+1)
    }

    daysSpacer(): number[] {
        let days = this.firstDayOfWeek()
        return [...[...Array(days < 7 ? days : 6).keys()].map(d => ++d)]
    }

    daysInMonth(): number[] { 
        let days = this._calendarService.daysInMonth(this.selected.getMonth()+1,  this.selected.getFullYear())
        return [...[...Array(days).keys()].map(d => ++d)]
    }

    selectDay(day: number): void {
        this.selected = new Date(
            this.selected.getFullYear(), 
            this.selected.getMonth(), 
            day
        )
        localStorage.setItem('selected', this.selected.toString())
    }

    getSelectedDay(): Date {
        return this.selected || new Date(localStorage.getItem('selected')) || new Date(Date.now())
    }

    isToday(day: number = 0,
        month: number = this.selected.getMonth(), 
        year: number = this.selected.getFullYear()
    ) {
        let date = new Date(year, month, day)
        return this.isSameDate(this.today, date)
    }

    isSelected(
        day: number = 0,
        month: number = this.selected.getMonth(), 
        year: number = this.selected.getFullYear()
    ) {
        return  this.selected.getFullYear() == year &&
                this.selected.getMonth()    == month &&
                this.selected.getDate()     == day
    }

    isSameDate(dateA: Date, dateB: Date = undefined): boolean {
        return this._calendarService.isSameDate(dateA, dateB)
    }

    getEvents(
        day: number = undefined,
        month: number = undefined, 
        year: number = undefined
    ): Event[] {
        if (!day && !month && !year)
            return this.events

        return this.events.filter(item => {
            let date = new Date(item.date)
            if (day && month != undefined && year) 
                return  this.isSameDate(date, new Date(year, month, day))
            if (!day && month && year) 
                return  date.getMonth()    == month &&
                        date.getFullYear() == year
            if (!day && !month && year)
                return  date.getFullYear() == year

            return true
        })
    }

    getEvent(): Event | undefined {
        return undefined
    }

    getNewId() {
        return this._idbService.exec('getEvents')
    }
    
    nextMonth() {
        let newDate = this._calendarService.nextMonth(this.selected)
        this.selected = newDate
    }

    prevMonth() {
        let newDate = this._calendarService.prevMonth(this.selected)
        this.selected = newDate
    }

  /* ---------------------- REF 12 | Template literals ---------------------- */
  dateToString(date, delimiter = '-', reverse = false) {
      if (!date) return ''
      let day = date.getDate();
      let month = date.getMonth() + 1;
      if (reverse)
          return `${date.getFullYear()}${delimiter}${month < 10 ? '0' + month : month}${delimiter}${day < 10 ? '0' + day : day}`
      return `${day < 10 ? '0' + day : day}${delimiter}${month < 10 ? '0' + month : month}${delimiter}${date.getFullYear()}`
  }


    setSelected(date) {
        let dateObj = new Date()  
        date.split('-').forEach((item, index) => {
            if (index == 0) dateObj.setFullYear(parseInt(item))
            if (index == 1) dateObj.setMonth(parseInt(item) - 1)
            if (index == 2) dateObj.setDate(parseInt(item))
        })
        this.selected = dateObj
        return this.selected
    }

    getToday() {
        return this.today
    }

    getSelected() {
        return this.selected
    }


    async loadEvents() {
        let events =  await this._calendarService.getEvents()
        console.log(events)
        this.events = <Event[]> events
    }

}
