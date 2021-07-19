import React, { useState, useEffect } from 'react'

import PokemonCard from './../PokemonCard/PokemonCard'

import { indexAllPokemon } from './../../api/pokemon'

export default function IndexPokemon (props) {
  const [pokemon, setPokemon] = useState('')

  useEffect(() => {
    !pokemon && indexAllPokemon()
      .then(res => setPokemon(res.data.pokemons))
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
