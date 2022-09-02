import network from './index.js'

export function login(data) {
    return network({
      url: '/signIn',
      method: 'post',
      data
    })
  }
