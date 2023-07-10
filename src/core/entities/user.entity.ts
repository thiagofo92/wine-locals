import { randomUUID } from "crypto"

interface UserData {
  id?: string,
  name: string,
  cpf: string,
  birthday: string,
  password: string,
  email: string
}
export class UserEntity {
  id: string
  name: string
  cpf: string
  birthday: string
  password: string
  email: string

  constructor(user: UserData) {
    this.id = user.id ? user.id : randomUUID()
    this.name = user.name
    this.cpf = user.cpf
    this.birthday = user.birthday
    this.password = user.password
    this.email = user.email
  }

  hasLegalAge(): boolean {
    const birthday = new Date(this.birthday)
    const now = new Date()
    return (now.getFullYear() - birthday.getFullYear()) >= 18
  }
}