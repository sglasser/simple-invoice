import { User } from './user';

export interface Invoice {
  invoiceId?: string,
  userId?: string,
  invoiceNumber: number,
  recipient: User,
  due?: string,
  lineItems?: LineItem[],
  paid: boolean,
  created: string,
  year: number,
  month: number,
  dueYear: number,
  dueMonth: number
}

export interface LineItem {
  qty?: number,
  desc?: string,
  price?: number
}
