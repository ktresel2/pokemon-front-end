import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import { showOnePokemon } from './../../api/pokemon'
import { indexAllSquads } from './../../api/squads'
import SquadCard from './../SquadCard/SquadCard.js'

// import { getAllCarts, addToCart } from './../../api/cart'
// import messages from '../AutoDismissAlert/messages'

const ShowPokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const [squads, setSquads] = useState(null)

  const { user, match } = props

  useEffect(() => {
    !pokemon && showOnePokemon(match.params.id)
      .then(res => setPokemon(res.data.pokemon))
      .then(res => user && !squads && indexAllSquads(user))
      .then(res => setSquads(res.data.squads))
      .catch(console.error)
    console.log(squads)
  })

  return (
    <main className="show-page">
      <h1>{pokemon && pokemon.name}</h1>
      <img src={pokemon && pokemon.image} />
      {user && squads && squads.map(squad => {
        return <SquadCard
          key={squad._id}
          id={squad._id}
          pokemon={squad.pokemon}
          showingPoke={pokemon}
          user={user}
        />
      })}
    </main>
  )
}

export default withRouter(ShowPokemon)
