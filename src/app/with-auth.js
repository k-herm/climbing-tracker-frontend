import React, { useEffect, useContext } from 'react'
import router, { useRouter } from 'next/router'
import { getRequest } from '../request'
import { getAPIBaseURL } from '~/config'
import { UserContext } from '~/src/app/Contexts/UserStore'

const AuthProvider = ({ children }) => {
  const { pathname } = useRouter()
  const { setUserData } = useContext(UserContext)

  const checkUser = async () => {
    try {
      const url = `${getAPIBaseURL()}/me`
      const response = await getRequest(url)
      setUserData(response.userId, response.userName)
    }
    catch (error) {
      const validUnauthorizedPages = [
        '/',
        '/login'
      ]
      if (error.status === 401 && !validUnauthorizedPages.includes(pathname)) {
        router.push('/login')
      }
    }
  }

  useEffect(() => { checkUser() }, [pathname])

  return <>{children}</>
}

export default AuthProvider