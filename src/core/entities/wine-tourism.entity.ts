export interface WineTourismEntity {
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

export const Week = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
  All: 'All'
}
