export class UserUseCaseLegalAgeError extends Error {
  constructor () {
    super()
    this.message = 'Invalid Age, age most be high than 18'
    this.name = 'UserUseCaseLegalAgeError'
  }
}
