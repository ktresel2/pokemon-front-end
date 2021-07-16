import React, { useState, useEffect } from 'react'

import PokemonCard from './../PokemonCard/PokemonCard'

import { indexAllPokemon } from './../../api/pokemon'

const IndexAll = props => {
  const [pokemon, setPokemon] = useState('')

  useEffect(() => {
    !pokemon && indexAllPokemon()
      .then(res => setPokemon(res.data.pokemons))
  })

  return (
    pokemon && pokemon.map(poke => {
      return <div key={poke._id}>
        <PokemonCard
          key={poke._id}
          name={poke.name}
          image={poke.image}
          type={poke.type}
        />
      </div>
    })
  )
}

export default IndexAll
