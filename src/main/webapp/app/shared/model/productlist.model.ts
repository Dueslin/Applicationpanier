export interface IProductlist {
  id?: string;
}

export class Productlist implements IProductlist {
  constructor(public id?: string) {}
}
