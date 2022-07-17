export default class Utils {
  static dateStringToDate(str: string) {
    return new Date(str)
  }

  static dateToDateString(date: Date) {
    return date.toISOString().split('T')[0]
  }
}
