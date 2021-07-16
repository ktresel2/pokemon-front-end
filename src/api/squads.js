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

export const createSquad = user => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/squads`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      squad: {
        owner: user.id,
        pokemon: [],
        current: !!user.carts.cart.current
      }
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

export const addToSquad = (squadId, pokemonId, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/squads/' + squadId,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      pokemon: { id: pokemonId }
    }
  })
}

export const deleteFromSquad = (squadId, pokemonId, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/cart-delete/' + squadId,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      pokemon: { id: pokemonId }
    }
  })
}

export const deleteSquad = (squadId, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/squads/' + squadId,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
