export interface IProductdetails {
  id?: string;
}

export class Productdetails implements IProductdetails {
  constructor(public id?: string) {}
}
