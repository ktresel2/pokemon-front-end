import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import { showOneSquad } from './../../api/squads'

import PokemonCard from './../PokemonCard/PokemonCard'
// import { getAllCarts, addToCart } from './../../api/cart'
// import messages from '../AutoDismissAlert/messages'

const ShowSquad = props => {
  const [squad, setSquad] = useState(null)

  const { user, match } = props

  useEffect(() => {
    console.log(user, squad)
    !squad && showOneSquad(match.params.id, user)
      .then(res => setSquad(res.data.squad.pokemon))
  })

  // const handleClick = (squad, pokemon, user) => {
  //   deleteFromSquad(squad, pokemon.id, user)
  // }

  return (
    <main className="d-grid main-index">
      {squad && squad.map(poke => {
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

export default withRouter(ShowSquad)
