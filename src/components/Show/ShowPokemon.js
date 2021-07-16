import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import { showOnePokemon } from './../../api/pokemon'
import { addToSquad } from './../../api/squads'
// import { getAllCarts, addToCart } from './../../api/cart'
// import messages from '../AutoDismissAlert/messages'

const ShowPokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const [currentSquad, setCurrentSquad] = useState(null)

  const { user, match } = props

  useEffect(() => {
    setCurrentSquad(user ? user.squads.squad.current = true : null)

    !pokemon && showOnePokemon(match.params.id)
      .then(res => setPokemon(res.data.pokemon))
  })

  const handleClick = () => {
    addToSquad(currentSquad, pokemon.id, user)
  }

  return (
    <main className="show-page">
      <h1>{pokemon ? pokemon.name : 'hello'}</h1>
      <img src={pokemon ? pokemon.image : ''} />
      <button onClick={handleClick} className="btn btn-outline-success">Add to Squad</button>
    </main>
  )
}

export default withRouter(ShowPokemon)
