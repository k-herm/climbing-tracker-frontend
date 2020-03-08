import React, { useEffect, useContext } from 'react'
import router, { useRouter } from 'next/router'
import { getRequest } from '../request'
import { getAPIBaseURL } from '~/config'
import { UserContext } from '~/src/app/UserStore'

const AuthProvider = ({ children }) => {
  const { pathname } = useRouter()
  const { setUser } = useContext(UserContext)

  const checkUser = async () => {
    try {
      const url = `${getAPIBaseURL()}/me`
      const response = await getRequest(url)
      setUser(response.userId, response.userName)
    }
    catch (error) {
      if (error.status === 401 && pathname !== '/') {
        router.push('/login')
      }
      console.log(error)
    }
  }

  useEffect(() => { checkUser() }, [pathname])

  return <>{children}</>
}

export default AuthProvider