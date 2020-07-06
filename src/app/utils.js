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

const sortTwoGrades = (a, b) => {
  const getLetter = (grade) => {
    let letter = ''
    if (/[a-d]/.test(grade)) {
      letter = grade.slice(-1)
    }
    return letter
  }

  const letter1 = getLetter(a)
  const letter2 = getLetter(b)
  const grade1 = parseInt(a.replace("5.", ""))
  const grade2 = parseInt(b.replace("5.", ""))
  if (grade1 - grade2 < 0) return -1
  else if (grade1 - grade2 > 0) return 1

  if (letter1 < letter2) return -1
  else if (letter1 > letter2) return 1
  else return 0
}

export const getHigherGrade = (a, b) => {
  const val = sortTwoGrades(a, b)
  switch (val) {
    case -1: return b
    case 0: return a
    case 1: return a
  }
}

export const sortArrayOfObjectsByGrade = (gradesArray, key) =>
  gradesArray.sort((a, b) => sortTwoGrades(a[key], b[key]))