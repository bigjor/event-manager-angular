import { Injectable } from '@angular/core';
import { TableEvents } from './tables/events';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private VERSION: number = 1
  private TABLES: object = {
    EVENTS: {
      entity: TableEvents,
      name: TableEvents.table_name,
      auto_increment: TableEvents.auto_increment,
      cols: {
        description: 'string',
        title: 'string',
        color: 'string',
        date: 'string'
      }
    }
  }

  db: any;

  constructor() {
    this.init()
  }

  init(): void {
    this.db = new Dexie('App');
    let tables = {}
    for (let table of Object.values(this.TABLES)) 
      tables[table.name] = `${table.auto_increment ? '++id' : 'id'}, ${Object.keys(table.cols).join(', ')}`
    
    this.db.version(this.VERSION).stores(tables);

    for (let table of Object.values(this.TABLES)) 
      table.instance = this.db.table(table.name);
    
  }

  async exec(method, ...args): Promise<void | any | any[]> {
    for (let table of Object.values(this.TABLES)) {
      let controller = new table.entity(table.instance);
      if (controller[method]) 
        return await controller[method](...args);
    }
  }

}
