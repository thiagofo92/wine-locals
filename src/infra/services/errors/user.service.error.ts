export class UserServiceUserNotFound extends Error {
  constructor() {
    super()
    this.name = 'UserServiceUserNotFound'
    this.message = 'User not found'
  }
}