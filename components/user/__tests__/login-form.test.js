import React from 'react'
import Router from 'next/router'
import { render, fireEvent } from '@testing-library/react'
import fetch from 'jest-fetch-mock'
import LoginForm from '../login-form'

jest.mock('next/router', () => ({ push: jest.fn() }))

describe('login form', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  const email = 'k@aol.com'
  const password = 'password'

  it('should render component', () => {
    const { getByText } = render(<LoginForm />)
    expect(getByText('Email')).toBeTruthy()
    expect(getByText('Password')).toBeTruthy()
  })

  it('should make a post request on submit', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ userId: '123', userName: 'k' }),
      {
        headers: { 'content-type': 'application/json; charset=utf-8' },
        ok: true
      }
    )

    const { getByLabelText, getByText } = render(<LoginForm />)
    fireEvent.change(getByLabelText('email'), {
      target: { value: email }
    })
    fireEvent.change(getByLabelText('password'), {
      target: { value: password }
    })

    fireEvent.submit(getByText('Continue'))

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('login'),
      expect.objectContaining({
        body: JSON.stringify({ email, password })
      })
    )
    // expect(Router.push).toHaveBeenCalledTimes(1)
    // expect(Router.push).toHaveBeenCalledWith('/dashboard')
  })

  it('should not submit post if email input is not filled', async () => {
    const { getByLabelText, getByText, findByText } = render(<LoginForm />)
    fireEvent.change(getByLabelText('password'), {
      target: { value: password }
    })

    fireEvent.submit(getByText('Continue'))

    const error = findByText('Please fill in email and password.')
    expect(fetch).not.toHaveBeenCalled()
    expect(error).toBeTruthy()
  })

  it('should not submit post if password input is not filled', async () => {
    const { getByLabelText, getByText, findByText } = render(<LoginForm />)
    fireEvent.change(getByLabelText('email'), {
      target: { value: email }
    })

    fireEvent.submit(getByText('Continue'))

    const error = findByText('Please fill in email and password.')
    expect(fetch).not.toHaveBeenCalled()
    expect(error).toBeTruthy()
  })
})