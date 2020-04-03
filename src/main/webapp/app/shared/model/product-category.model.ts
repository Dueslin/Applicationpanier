import { IProduct } from 'app/shared/model/product.model';

export interface IProductCategory {
  id?: string;
  name?: string;
  description?: string;
  products?: IProduct[];
}

export class ProductCategory implements IProductCategory {
  constructor(public id?: string, public name?: string, public description?: string, public products?: IProduct[]) {}
}
