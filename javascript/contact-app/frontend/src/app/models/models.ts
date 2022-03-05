export class ContactView {
  constructor(
    public id: number,
    public name: string,
    public photo: Photo | null,
  ) {}
}
export class Contact {
  constructor(
    public firstName: string,
    public lastName: string,
    public nickName: string,
    public address: string,
  ) {}
}
export class FullContact {
  constructor(
    public id: number,
    public contact: Contact,
    public photo: Photo | null,
    public phoneNumbers: PhoneNumber[],
  ) {}
}

export class PhoneNumber {
  constructor(
    public type: string,
    public numericNumber: string,
    public id?: number,
  ) {}
}
export class Photo {
  constructor(
    public imgUrl: string,
    public blur: boolean,
    public gray: boolean,
    public saturation: boolean,
    public id?: number,
  ) {}
}

export interface variablesQuery {
  filterValue: string;
  skip: number;
  limit: number;
  date: string;
}
