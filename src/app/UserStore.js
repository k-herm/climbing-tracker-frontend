import React, { useState } from 'react'

export const UserContext = React.createContext()

export const UserStore = ({ children }) => {
  const [name, setName] = useState('Unknown')
  const [isSignIn, setIsSignIn] = useState(false)

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        isSignIn,
        setIsSignIn
      }}
    >
      {children}
    </UserContext.Provider>
  )
}