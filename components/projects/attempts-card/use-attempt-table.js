import { useState, useEffect } from 'react'
import { getDateString } from '~/src/app/utils'

export const useAttemptTable = (attempts, setAttempts) => {
  const [isError, setIsError] = useState(false)

  const createEmptyAttempt = () => ({
    date: new Date(),
    attemptType: 'redpoint',
    numberOfAttempts: 1,
    send: false
  })

  useEffect(() => {
    if (!attempts.length) {
      setAttempts([createEmptyAttempt()])
    }
    else if (hasDuplicate()) {
      setIsError(true)
      return
    }
    setIsError(false)
  }, [])

  const hasDuplicate = () => {
    return attempts.some((attempt, i) => {
      for (let j = i + 1; j < attempts.length; j++) {
        return (
          getDateString(attempts[j].date) === getDateString(attempt.date) &&
          attempts[j].attemptType === attempt.attemptType
        )
      }
    })
  }

  const handleChange = (index, key, value) => {
    setAttempts(prevState => {
      const state = [...prevState]
      state[index][key] = value
      return state
    })

    if (hasDuplicate()) {
      setIsError(true)
      return
    }
    setIsError(false)
  }

  const handleAdd = () => {
    setAttempts([...attempts, createEmptyAttempt()])
  }

  const handleDelete = (i) => {
    setAttempts(prevState => {
      const state = [...prevState]
      state.splice(i, 1)
      return state
    })
  }

  return {
    handleChange,
    handleAdd,
    handleDelete,
    isError
  }
}
