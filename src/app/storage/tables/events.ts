/**
 * Nombre de la tabla, que es importada en la constante TABLES para crearlas en el init
 * Table name, which is imported in the constant TABLES to create them in init
 */
const EVENTS: string = 'Events'
/**
 * Propiedad auto_increment define si el id de la table se sumara en +1 por registro
 * Auto_increment property defines if the table id will be added by +1 per record
 */
const AUTO_INCREMENT: boolean = true
/**
 * Metodos de la tabla
 * Table Class
 */
export class TableEvents {
  static table_name: string = EVENTS;
  static auto_increment: boolean = AUTO_INCREMENT;

  instance: any;

  constructor(instance: any) {
      this.instance = instance
  }

  async createEvent(event) {
    let id = null
    try {
      id = await this.instance.put(event);
    } catch (error) {
      console.log('error');
    } finally {
      return id
    }
  }

  async getEvents() {
    const events = await this.instance.toArray();
    return events
  }

  async getEvent(id: number | string) {
    const event = await this.instance
      .get(typeof id == 'string' ? parseInt(id) : id);
    return event
  }

  clear() {
    this.instance.clear();
  }
}

