export interface WineTourismEntity { 
  id: number
  idWinery: number
  name: string
  description: string
  price: number
  openDays: WineTourismEntity.Week
  startHour: string
  endHour: string
  duration: string
}
export namespace WineTourismEntity {
  export enum Week {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
    All = 'All'
}
}