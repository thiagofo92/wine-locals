export class UserCreatContrainError extends Error {
  constructor () {
    super()
    this.name = 'UserCreatContrainError'
    this.message = 'Email already record'
  }
}
