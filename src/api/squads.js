import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexAllSquads = user => {
  return axios({
    url: apiUrl + '/squads',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showOneSquad = (id, user) => {
  return axios({
    url: apiUrl + '/squads/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateSquad = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/squads/' + id,
    data,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deleteSquad = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/squads/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
