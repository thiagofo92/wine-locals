import { Either, left, right } from "@/shared/errors/either";
import { UserSerivcePort } from "../port";

export class UserPrismaService implements UserSerivcePort {
  async create (input: unknown):  Promise<Either<Error, unknown>> {
    try {
      return right('') 
    } catch (error: any) {
      return left(error) 
    }
  }
  async update (input: unknown):  Promise<Either<Error, unknown>>{
    try {
      return right('') 
    } catch (error: any) {
      return left(error) 
    }
  }
  async delete (id: string):  Promise<Either<Error, unknown>> {
    try {
      return right('') 
    } catch (error: any) {
      return left(error) 
    }
  }
  async findById (id: string): Promise<Either<Error, unknown>>{
    try {
      return right('') 
    } catch (error: any) {
      return left(error) 
    }
  }
  async findAll (): Promise<Either<Error, unknown>> {
    try {
      return right('') 
    } catch (error: any) {
      return left(error) 
    }
  }
  async validate (): Promise<Either<Error, unknown>> {
    try {
      return right('') 
    } catch (error: any) {
      return left(error) 
    }
  }

}