import { Either, left, right } from "@/shared/errors/either";
import { UserSerivcePort } from "../port";
import { UserEntity } from "@/core/entities";
import { DataServiceNotFound } from "../errors/data.service.error";

export class UserMemoryService implements UserSerivcePort {
  private readonly users: UserEntity [] = []
  async create (input: UserEntity):  Promise<Either<Error, string>> {
    try {
      this.users.push(input) 
      return right(input.id) 
    } catch (error: any) {
      return left(error) 
    }
  }
  async update (input: UserEntity):  Promise<Either<Error, boolean>>{
    try {
      const index = this.users.findIndex(item => item.id === input.id)

      if(index < 0) return left(new DataServiceNotFound()) 

      this.users[index] = input
      return right(true) 
    } catch (error: any) {
      return left(error) 
    }
  }
  async delete (id: string):  Promise<Either<Error, boolean>> {
    try {
      const index = this.users.findIndex(item => item.id === id)

      if(index < 0) return left(new DataServiceNotFound())

      this.users.splice(index, 1)

      return right(true) 
    } catch (error: any) {
      return left(error) 
    }
  }
  async findById (id: string): Promise<Either<Error, UserEntity | null>>{
    try {
      const user = this.users.find(item => item.id === id)

      if(!user) return left(new DataServiceNotFound())
      
      return right(user) 
    } catch (error: any) {
      return left(error) 
    }
  }
  async findAll (): Promise<Either<Error, UserEntity[]>> {
    try {
      const users = this.users
      return right(users) 
    } catch (error: any) {
      return left(error) 
    }
  }
  async validate (email: string, password: string): Promise<Either<Error, boolean>> {
    try {
      const user = this.users.find(item => item.email === email && item.password === password)
      return right(user ? true : false) 
    } catch (error: any) {
      return left(error) 
    }
  }

}