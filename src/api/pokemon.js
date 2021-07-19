import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexAllPokemon = () => {
  return axios({
    url: apiUrl + '/pokemon'
  })
}

export const showOnePokemon = id => {
  return axios({
    url: apiUrl + '/pokemon/' + id
  })
}
