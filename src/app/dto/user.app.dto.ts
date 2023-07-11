import { type UserEntity } from '@/core/entities'

type UserProperty = {
  [k in keyof UserEntity]: UserEntity[k]
}

export type UserAppDto = Omit<UserProperty, 'hasLegalAge' >
