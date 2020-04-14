import { GRADES, MONTHS } from './constants'

export const getDateString = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const needPrefix = month < 10
  const year = date.getFullYear()
  return `${year}-${needPrefix ? 0 : ''}${month}-${day}`
}

export const formatGradeValue = (grade) =>
  grade.replace(/_/, '').replace(/_/, '.')

// export const getGradeCategories = (chart) => {
//   const highestIndex = GRADES.findIndex((grade) =>
//     grade === chart[chart.length - 1].grade
//   )
//   const lowestIndex = GRADES.findIndex((grade) =>
//     grade === chart[0].grade
//   )
//   return GRADES.slice(lowestIndex, highestIndex + 1)
// }

// export const getGradeCategoriesFromArray = (array) => {
//   const highestIndex = GRADES.findIndex((grade) =>
//     grade === array[array.length - 1]
//   )
//   const lowestIndex = GRADES.findIndex((grade) =>
//     grade === array[0]
//   )
//   return GRADES.slice(lowestIndex, highestIndex + 1)
// }

export const getMonth = (date) => MONTHS[new Date(date).getMonth()]