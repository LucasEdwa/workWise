export class User {
    constructor(
      public _id: string,
      public name: string,
      public email: string,
      public password: string,
      public role: string,
      public employeeNumber: number,
      public companyId: string,
      public createdAt: Date,
      public updatedAt: Date,
      public token: string
    ) {}
  }