export class DataServiceNotFound extends Error {
  constructor (message?: string) {
    super()
    this.name = 'DataServiceNotFound'
    this.message = message || 'Data not found'
  }
}
