import React, { useState } from 'react'

export const UserContext = React.createContext()

export const UserStore = ({ children }) => {
  const [id, setId] = useState(null)
  const [name, setName] = useState(null)

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        name,
        setName
      }}
    >
      {children}
    </UserContext.Provider>
  )
}