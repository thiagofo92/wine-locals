import Express from 'express'
import { RoutersServer } from './routers/router'

export const app = Express()

const port = process.env.SERVER_PORT || '3000'
const host = process.env.host || '0.0.0.0'

export function StartServer (): void {
  const router = new RoutersServer(Express.Router())

  app.use('/api', router.build())
  app.listen(Number(port), host, () => {
    console.log(`Server is running ${host}:${port}`)
  })
}
