import React, { useState, useEffect } from 'react'
import router, { useRouter } from 'next/router'
import { UserContext } from './UserStore'
import { getRequest, postRequest } from '../request'
import { getAPIBaseURL } from '../../config'



const AuthProvider = ({ children }) => {
  const { pathname } = useRouter()
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)

  const getUser = async () => {
    try {
      const url = `${getAPIBaseURL()}/me`
      const response = await getRequest(url)
      setUserId(response.userId)
      setUserName(response.userName)
    }
    catch (error) {
      if (error.status === 401 && pathname !== '/') {
        router.push('/login')
      }
      console.log(error)
    }
  }

  useEffect(() => { getUser() }, [pathname])

  return (
    <UserContext.Consumer>
      {(context) => {
        context.setId(userId)
        context.setName(userName)
        console.log(userId)
        return children
      }}
    </UserContext.Consumer>
  )
}

export default AuthProvider