import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IShipment {
  id?: string;
  trackingCode?: string;
  date?: Moment;
  details?: string;
  invoice?: IInvoice;
}

export class Shipment implements IShipment {
  constructor(public id?: string, public trackingCode?: string, public date?: Moment, public details?: string, public invoice?: IInvoice) {}
}
