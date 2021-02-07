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

  events: Event[] = [
    {
        date: new Date(Date.now()),
        color: 'red',
        title: 'TODAY',
        id: this._calendarService.uuidv4()
    },
    {
        date: new Date(Date.now()),
        color: this._calendarService.randomColor(),
        title: 'HANNI',
        id: this._calendarService.uuidv4()
    },
    {
        date: new Date(Date.now()),
        color: 'red',
        title: 'TODAY',
        id: this._calendarService.uuidv4()
    },
    {
        date: new Date(Date.now()),
        color: this._calendarService.randomColor(),
        title: 'HANNI',
        id: this._calendarService.uuidv4()
    },
    {
        date: new Date(Date.now()),
        color: 'red',
        title: 'TODAY',
        id: this._calendarService.uuidv4()
    },
    {
        date: new Date(Date.now()),
        color: this._calendarService.randomColor(),
        title: 'HANNI',
        id: this._calendarService.uuidv4()
    }
  ]
  today: Date = new Date(Date.now())
  current: Date = this.today
  selected: Date = this.getSelectedDay()
  eventSelected = null
  newEvents = null

  constructor(private _calendarService: CalendarService, private _idbService: IdbService) {
      
  }

  ngOnInit(): void {
    window['app'] = this

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
            if (day && month != undefined && year) 
                return  this.isSameDate(item.date, new Date(year, month, day))
            if (!day && month && year) 
                return  item.date.getMonth()    == month &&
                        item.date.getFullYear() == year
            if (!day && !month && year)
                return  item.date.getFullYear() == year

            return true
        })
    }

    getEvent(): Event | undefined {
        return undefined
    }

    getNewId() {
        return this._idbService.exec('getEvents')
    }

  draw() {
    let element = document.querySelector('#calendar')
      if (!element) return
      let year = this.selected.getFullYear()
      let month = this.selected.getMonth() + 1
      
      // DRAW DAY BOX
      /* ----------------------- REF 15 | Modificar el nodes ---------------------- */
      // for (let day = 1; day <= this.daysInMonth(); day++) {
        for (let day = 1; day <= 28; day++) {
          let date = new Date(year, month - 1, day)
          let container = document.createElement('div')
          container.setAttribute('ref', this.dateToString(date))
        //   let number = document.createElement('div')
        //   number.className = 'number'
        //   number.appendChild(document.createTextNode(day.toString()))
        //   if (this.isSameDate(date, this.selected))
        //       number.className = 'selected'
        //   if (this.isSameDate(date))
        //       number.className = 'current'
        //   container.className = 'item-day'
        //   container.appendChild(number)

          /* ---------------------------- REF 6 | Iterables --------------------------- */
        //   for(let ev of this.events) {
        //       if (!this.isSameDate(date, ev.object.date)) continue;
        //       let divEvent = document.createElement('div')
        //       divEvent.className = 'event'
        //       divEvent.style.background = ev.object.color
        //       divEvent.innerText = ev.object.title
        //       divEvent.addEventListener('click', () => {
        //           // window.app.eventReactive.event = ev

        //       })
        //       container.appendChild(divEvent)
        //   }

          /* ------------------------ REF 11 | Funcions fletxa ------------------------ */
        //   container.addEventListener('click', () => {
        //       this.selected = new Date(year, month - 1, day)
        //       Object.values(container.parentElement.children).forEach(item => {
        //           if (item.getAttribute('ref')) 
        //               if (item.getAttribute('ref') == this.dateToString(date) && this.isSameDate(date))
        //                   item.children[0].className = 'current'
        //               else if (item.getAttribute('ref') == container.getAttribute('ref'))
        //                   item.children[0].className = 'selected'
        //               else
        //                   item.children[0].className = 'number'
        //       })
        //   })

          element.appendChild(container)

      }
  }
    

//   nextMonth() {
//       let currentMonth = this.selected.getMonth()
//       let currentYear = this.selected.getFullYear()
//       let month = null
//       let year = null
      
//       if (currentMonth == 11) {
//           year = currentYear + 1
//           month = 0
//       } else {
//           year = currentYear
//           month = currentMonth + 1
//       }

//       /* ---------------------- REF 13 | Objectes predefinits --------------------- */
//       this.selected = new Date(year, month, 1)
//       this.draw()

//       return this.selected
//   }
    nextMonth() {
        // let currentMonth = this.selected.getMonth()
        // let currentYear = this.selected.getFullYear()
        // let month = null
        // let year = null
        
        // if (currentMonth == 11) {
        //     year = currentYear + 1
        //     month = 0
        // } else {
        //     year = currentYear
        //     month = currentMonth + 1
        // }

        // /* ---------------------- REF 13 | Objectes predefinits --------------------- */
        // this.selected = new Date(year, month, 1)
        // // this.draw()

        // return this.selected
        let newDate = this._calendarService.nextMonth(this.selected)
        this.selected = newDate
    }


  prevMonth() {
    //   let currentMonth = this.selected.getMonth()
    //   let currentYear = this.selected.getFullYear()
    //   let month = null
    //   let year = null

    //   if (currentMonth == 0) {
    //       year = currentYear - 1
    //       month = 11
    //   } else {
    //       year = currentYear
    //       month = currentMonth - 1
    //   }

    //   this.selected = new Date(year, month, 1)
    //   this.draw()
    this.selected = this._calendarService.prevMonth(this.selected)
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

  addEvent(event) {

      /* ------------------------- REF 18 | Destructuring ------------------------- */
      let { title, description, date, color } = event

      color = color == 'random' ? this.randomColor() : color 
      
      // let newEvent = new CustomItemEvent(title, description, date, color)
      
      // window.localdb.createEvent(this.uuidv4(), newEvent)
      this.updateEvents()
  }

  editEvent(id, event) {

      let { title, description, date, color } = event
      color = color == 'random' ? this.randomColor() : color 
      
      // let modifiedEvent = new CustomItemEvent(title, description, date, color)
      
      // window.localdb.createEvent(id, modifiedEvent)
      this.updateEvents()
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

  updateEvents() {
      // let getEvents = window.localdb.getEventAllObject()
      // getEvents.onsuccess = () => {
      //     this.events = getEvents.result
      //     this.draw()
      // }
  }

  uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }

  randomColor() {
      return '#xxxxxx'.replace(/[x]/g, function(c) {
          let r = Math.random() * 16 | 0, v = r;
          return v.toString(16);
      });
  }

}
