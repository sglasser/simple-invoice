import { Recipient } from './recipient';

export interface Invoice {
  invoiceId: string,
  userId: string,
  invoiceNumber: number,
  recipient: Recipient,
  due?: string,
  lineItems?: LineItem[],
  paid?: boolean,
  created: string,
  year?: number,
  month?: number,
  dueYear?: number,
  dueMonth?: number
}

export interface LineItem {
  lineItemId: string,
  qty: number,
  desc?: string,
  price: number,
  total: number,
}
