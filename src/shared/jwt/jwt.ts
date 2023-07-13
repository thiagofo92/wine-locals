import Jwt from 'jsonwebtoken'

export function generateTokenJWT (id: string): string {
  return Jwt.sign({ id }, process.env.TOKEN || '', {
    expiresIn: '15min'
  })
}
