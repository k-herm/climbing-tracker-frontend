import { MONTHS } from './constants'

export const getDateString = (date) => {
  const day = date.getDate()
  const needDayPrefix = day < 10
  const month = date.getMonth() + 1
  const needMonthPrefix = month < 10
  const year = date.getFullYear()
  return `${year}-${
    needMonthPrefix ? 0 : ''
    }${month}-${
    needDayPrefix ? 0 : ''
    }${day}`
}

export const formatGradeValue = (grade) =>
  grade.replace(/_/, '').replace(/_/, '.')

export const reverseFormatGradeValue = (grade) =>
  '_'.concat(grade.replace('.', '_'))

export const getMonth = (date) => MONTHS[date.getMonth()]
