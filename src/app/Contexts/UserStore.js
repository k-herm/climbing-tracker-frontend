import React, { Component } from 'react'

export const UserContext = React.createContext({
  id: null,
  name: null,
  setUser: () => { }
})

export class UserStore extends Component {
  constructor(props) {
    super(props)

    this.setUser = (id, name) => {
      this.setState({
        id,
        name
      })
    }

    this.state = {
      id: null,
      name: null,
      setUser: this.setUser
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
