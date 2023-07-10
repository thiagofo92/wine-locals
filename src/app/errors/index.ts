export class UserUseCaseLegalAgeError extends Error {
  constructor() {
    super()
    this.message = 'User dont has the legal age'
    this.name = 'UserUseCaseLegalAgeError'
  }
}