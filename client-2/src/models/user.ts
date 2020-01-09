export interface User {
  userId: string,
  accessToken: string,
  isAuthenticated: boolean,
  firstName?: string,
  lastName?: string,
  email?: string,
  recipients: Recipient[] | undefined
}

export interface Recipient {
  name: string,
  address?: string,
  city?: string,
  state?: string,
  postal?: string,
  email?: string
}