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
  dueMonth?: number,
  url?: string
}

export interface LineItem {
  qty?: number,
  desc?: string,
  price: number
}
