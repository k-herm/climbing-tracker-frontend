import React, { useContext } from 'react'
import { UserContext } from '../src/app/UserStore'

const Journal = () => {
  const { id, name } = useContext(UserContext)
  return <div>Journal PAGE</div>
}

export default Journal