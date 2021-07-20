import React, { useState, useEffect } from 'react'

import PokemonCard from './../PokemonCard/PokemonCard'

import { indexAllPokemon } from './../../api/pokemon'
import messages from '../AutoDismissAlert/messages'

export default function IndexPokemon (props) {
  const [pokemon, setPokemon] = useState('')

  const { msgAlert } = props

  useEffect(() => {
    !pokemon && indexAllPokemon()
      .then(res => setPokemon(res.data.pokemons))
      .then(() => msgAlert({
        heading: 'Index Success',
        message: messages.indexPokemonSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setPokemon(null)
        msgAlert({
          heading: 'Index Pokemon failed with error: ' + error.message,
          message: messages.indexPokemonFailure,
          variant: 'danger'
        })
      })
  })

  return (
    <main className="d-grid main-index">
      {pokemon && pokemon.map(poke => {
        return <PokemonCard
          key={poke._id}
          id={poke._id}
          name={poke.name}
          image={poke.image}
          type={poke.type}
          pokeId={poke.pokeId}
        />
      })}
    </main>
  )
}
