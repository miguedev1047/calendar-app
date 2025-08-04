const actualMonth = new Date().getMonth()
const actualDay = new Date().getDate()
const actualYear = new Date().getFullYear()

const actualStrDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
const actualStrMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())
const actualStrYear = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(new Date())

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export {
  actualMonth,
  actualDay,
  actualStrDay,
  actualYear,
  actualStrMonth,
  actualStrYear,
  daysOfWeek
}
