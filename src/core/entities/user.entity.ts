import { randomUUID } from 'crypto'

interface UserData {
  id?: string
  name: string
  cpf: string
  birthday: string
  password: string
  email: string
}
export class UserEntity {
  id: string
  name: string
  cpf: string
  birthday: string
  password: string
  email: string

  constructor (user: UserData) {
    this.id = user.id ? user.id : randomUUID()
    this.name = user.name
    this.cpf = user.cpf
    this.birthday = user.birthday
    this.password = user.password
    this.email = user.email
  }

  hasLegalAge (): boolean {
    const [day, month, year] = this.birthday.split('/')
    const birthdayYear = new Date(Number(year), Number(month), Number(day)).getFullYear()
    const currentlyYear = new Date().getFullYear()
    return (currentlyYear - birthdayYear) >= 18
  }
}
