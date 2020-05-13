import { createContext, useState } from 'react'

export const UserContext = createContext({
  id: null,
  name: null,
  setUser: () => { }
})

export const UserStore = ({ children }) => {
  const setUserData = (id, name) => setUser({ id, name })

  const [user, setUser] = useState({
    id: null,
    name: null,
    setUser: setUserData
  })

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
