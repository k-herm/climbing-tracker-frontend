import React, { useContext } from 'react'
import { UserContext } from '../src/app/UserStore'

const TestPage = () => {
  const { id, name } = useContext(UserContext)
  console.log(id, name);
  return <div>TEST PAGE</div>
}

export default TestPage