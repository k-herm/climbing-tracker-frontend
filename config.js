export const devEndpoint = 'http://localhost:4000'
export const prodEndpoint = 'http://localhost:4000'
// export const prodEndpoint = 'https://api.iclimbtracker.com'

export const getAPIBaseURL = () =>
  process.env.NODE_ENV === 'development' ? devEndpoint : prodEndpoint