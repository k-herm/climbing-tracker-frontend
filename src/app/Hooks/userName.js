import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Contexts/UserStore'

export const useUserName = () => {
  const [userName, setUserName] = useState(null)
  const { name } = useContext(UserContext)

  useEffect(() => {
    setUserName(name)
  })

  return userName
}