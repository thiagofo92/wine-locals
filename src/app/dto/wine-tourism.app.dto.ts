export interface WineTourismAppDto {
  id?: number
  idWinery: number
  name: string
  description: string
  price: string
  openDays: string[]
  startHour: string
  endHour: string
  duration: string
}

export interface WineTourismAppDtoOutPut {
  id?: number
  idWinery: number
  name: string
  description: string
  price: string
  openDays: string
  startHour: string
  endHour: string
  duration: string
}
