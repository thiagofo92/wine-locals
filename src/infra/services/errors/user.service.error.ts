export class UserCreatContrainError extends Error {
  constructor () {
    super()
    this.name = 'UserCreatContrainError'
    this.message = 'Email already record'
  }
}

export class UserValidateFail extends Error {
  constructor () {
    super()
    this.name = 'UserValidateFail'
    this.message = 'Wrong email or password'
  }
}
