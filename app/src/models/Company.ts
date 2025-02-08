export interface Company {
    _id: string;
    name: string;
    address: string;
    organizationNumber: number;
    users: string[];
    createdAt: Date;
    updatedAt: Date;
  }