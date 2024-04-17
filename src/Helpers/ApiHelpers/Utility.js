import TokenService from '../TokenService'
import config from '../../config'
import Validators from '../Validators'

export const scrollTo = refElement => {
  window.scrollTo({
    behavior: 'smooth',
    top: refElement.current.offsetTop,
  })
}

export const callApiWithFetch = async (endpoint, payload) => {
  return await fetch(`${config.API_ENDPOINT}/${endpoint}`, { ...payload }).then(
    response => {
      if (response.error) {
        Validators.refreshLoginToken(response.error)
        return response.json().then(error => Promise.reject(error))
      } else {
        return response.json()
      }
    },
  )
}

export const getHeaders = (method, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
    authorization: `bearer ${TokenService.getAuthToken()}`,
  },
  body: body && JSON.stringify(body),
})
