import React from 'react'
import { render } from '@testing-library/react'
import LoginPage from '../login'

describe('login page', () => {
  it('should render login page', () => {
    const { getByText } = render(<LoginPage />)
    expect(getByText('Login')).toBeTruthy()
    expect(getByText('iClimb-Tracker')).toBeTruthy()
  })
})