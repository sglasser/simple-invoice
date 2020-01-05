export interface Invoice {
  invoiceId?: string,
  userId?: string,
  invoiceNumber: number,
  recipient: Recipient,
  created: string,
  due: string,
  total: number,
  lineItems?: LineItem
}

export interface Recipient {
  name: string,
  address?: string,
  city?: string,
  state?: string,
  postalCode?: string,
  phone?: string
}

export interface LineItem {
  qty?: number,
  desc?: string,
  rate?: number,
  total: number
}
