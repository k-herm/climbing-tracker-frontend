import React, { useContext } from 'react'
import { UserContext } from '../src/app/UserStore'

const Dashboard = () => {
  const { id, name } = useContext(UserContext)
  console.log(id, name);
  return <div>DASHBOARD PAGE</div>
}

export default Dashboard