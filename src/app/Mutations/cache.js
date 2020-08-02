export const getOptimisticResponseObject = (queryName, typeName, data) => ({
  __typename: 'Mutation',
  [queryName]: {
    __typename: typeName,
    ...data
  }
})

export const deleteOne = (cache, query, { id, type }) => {
  const list = cache.readQuery({ query })
  list[type] = list[type].filter(item => item._id !== id)
  cache.writeQuery({ query, data: list })
}

export const addOne = (cache, query, { data, type }) => {
  const list = cache.readQuery({ query })
  list[type] = [...list[type], { ...data }]
  cache.writeQuery({ query, data: list })
}