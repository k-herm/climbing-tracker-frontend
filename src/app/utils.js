export const getDateString = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const needPrefix = month < 10
  const year = date.getFullYear()
  return `${year}-${needPrefix ? 0 : ''}${month}-${day}`
}

export const formatGradeValue = (grade) =>
  grade.replace(/_/, '').replace(/_/, '.')