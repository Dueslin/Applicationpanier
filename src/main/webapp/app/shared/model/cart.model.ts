export interface ICart {
  id?: string;
}

export class Cart implements ICart {
  constructor(public id?: string) {}
}
