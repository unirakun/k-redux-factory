import { getFromPath } from './utils'

/* eslint-disable import/prefer-default-export */
export const getState = options => (rootState) => {
  const { path, name } = options
  let subState = rootState

  if (path !== undefined && path.length > 0) subState = getFromPath(rootState, path)

  return subState[name]
}
