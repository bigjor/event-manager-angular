import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CalendarService } from '../calendar/calendar.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  formEvent: FormGroup;
  event: Event;
  id: number;

  constructor(private _calendarService: CalendarService,
              private _activatedRoute: ActivatedRoute, 
              private _appService: AppService) { }

  ngOnInit(): void {
    this.initForm()
    this.loadForm();
  }

  getSelectedColor(): string {
    return this.formEvent.get("color").value
  }

  async save() {
    if (this.formEvent.valid) {
      let title = this.formEvent.get('title').value;
      let description = this.formEvent.get('description').value;
      let color = this.formEvent.get('color').value;
      let date = this.formEvent.get('date').value;
      if (this.id) {
        let id = await this._appService.idbExecMethod('createEvent', {
          id: this.id,
          title,
          description,
          color: color == 'random' 
            ? this._calendarService.randomColor() 
            : color,
          date: date.toString()
        })
  
        console.log(`Saved ${id}`)
      } else {
        let id = await this._appService.idbExecMethod('createEvent', {
          title,
          description,
          color: color == 'random' 
            ? this._calendarService.randomColor() 
            : color,
          date: date.toString()
        })
  
        console.log(`Saved ${id}`)
      }
      
    }
  }
  initForm(): void {
    this.formEvent = new FormGroup({
      title:new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      color: new FormControl('', [
        Validators.required, 
        Validators.maxLength(7)
      ]),
      date: new FormControl('', [
        Validators.required
      ])
    });
  }
  loadForm(): void {
    let event: Event = {
      id: '0', 
      title:'', 
      description: '', 
      date: null, 
      color: ''
    }
    this._activatedRoute.params.subscribe(async param => {
      console.log(param.id)
      if (param.id) {
        this.id = parseInt(param.id)
        event = <Event> await this._appService.idbExecMethod('getEvent', param.id)
        

        this.formEvent = new FormGroup({
          title:new FormControl(event.title, [
            Validators.required
          ]),
          description: new FormControl(event.description, [
            Validators.required
          ]),
          color: new FormControl(event.color, [
            Validators.required, 
            Validators.maxLength(7)
          ]),
          date: new FormControl(event.date, [
            Validators.required
          ])
        });
      }
    })
    
    
  }

}

