import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Contexts/UserStore'

export const useUserData = () => {
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)

  const { id, name } = useContext(UserContext)

  useEffect(() => {
    setUserName(name)
    setUserId(id)
  })

  return { userName, userId }
}