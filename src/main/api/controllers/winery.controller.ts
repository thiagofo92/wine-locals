import { type WineryUseCasePort } from '@/app/port'

export class WineryController {
  constructor (private readonly usecase: WineryUseCasePort) {}
}
