import { createContext, useState } from 'react'

export const UserContext = createContext({
  id: null,
  name: null,
  setUser: () => { }
})

export const UserStore = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null
  })

  const setUserData = (id, name) => setUser({ id, name })

  return (
    <UserContext.Provider value={{ ...user, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
