export interface ITopbar {
  id?: string;
}

export class Topbar implements ITopbar {
  constructor(public id?: string) {}
}
