import fetch from 'isomorphic-unfetch'
import get from 'lodash.get'

const request = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    ...options.headers
  }
  const optionsWithDefaults = {
    credentials: 'include',
    ...options,
    headers
  }

  const response = await fetch(url, optionsWithDefaults)

  if (response.headers.get('content-type') !== 'application/json; charset=utf-8' &&
    response.ok) {
    return response
  }

  const responseBody = await response.json()

  if (!response.ok) {
    const errorMessage = get(responseBody, 'error.message') ||
      responseBody.error ||
      'Error from server.'
    const error = new Error(errorMessage)
    error.status = response.status
    throw error
  }

  return responseBody
}

export const getRequest = (url, customOptions = {}) => {
  const options = {
    method: 'GET',
    ...customOptions
  }
  return request(url, options)
}

export const postRequest = (url, payload = {}, customOptions = {}) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    ...customOptions
  }
  return request(url, options)
}