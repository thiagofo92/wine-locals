export class DataServiceNotFound extends Error {
  constructor () {
    super()
    this.name = 'DataServiceNotFound'
    this.message = 'Data not found'
  }
}
