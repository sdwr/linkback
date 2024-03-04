export default interface iUserSession {
  id?: number
  userId: number
  sessionToken: string
  deviceInfo: string

  createdAt?: any
  updatedAt?: any
}