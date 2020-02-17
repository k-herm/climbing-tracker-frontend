import React, { useEffect } from 'react'
import router, { useRouter } from 'next/router'
import { getRequest } from '../request'
import { getAPIBaseURL } from '../../config'

const AuthProvider = ({ children }) => {
  const { pathname } = useRouter()

  const checkUser = async () => {
    try {
      const url = `${getAPIBaseURL()}/me`
      await getRequest(url)
    }
    catch (error) {
      if (error.status === 401 && pathname !== '/') {
        router.push('/login')
      }
      console.log(error)
    }
  }

  useEffect(() => { checkUser() }, [pathname])

  return (<>{children}</>)
}

export default AuthProvider