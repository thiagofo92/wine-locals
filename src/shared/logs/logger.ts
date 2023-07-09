import { join } from 'path'
import Winston, { format, transports } from 'winston'

const path = join(process.cwd(), 'logs')
const logsFiles = [
  new transports.File({ dirname: path, filename: 'info.log' }),
  new transports.File({ dirname: path, filename: 'error.log', level: 'error' })
]

const transportsOptions: Winston.transport [] = [
  new transports.Console(),
  ...logsFiles
]

const options: Winston.LoggerOptions = {
  level: process.env.NODE_ENV === 'product' ? 'info' : 'debug',
  format: format.combine(format.json(), format.timestamp(), format.colorize({ all: true })),
  transports: transportsOptions,
  exceptionHandlers: [new transports.Console({ level: 'alert' })],
  rejectionHandlers: [new transports.Console({ level: 'alert' })]
}

export const Logger = Winston.createLogger(options)
