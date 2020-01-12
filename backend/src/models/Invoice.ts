export interface Invoice {
  invoiceId?: string,
  userId?: string,
  invoiceNumber: number,
  recipient: Recipient,
  due?: string,
  lineItems?: LineItem[],
  paid: boolean,
  created: string,
  year: number,
  month: number,
  dueYear: number,
  dueMonth: number
}

export interface Recipient {
  name: string,
  address?: string,
  city?: string,
  state?: string,
  postalCode?: string,
  phone?: string,
  email?: string
}

export interface LineItem {
  qty?: number,
  desc?: string,
  price?: number
}
