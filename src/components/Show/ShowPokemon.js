import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import { showOnePokemon } from './../../api/pokemon'
import { indexAllSquads, createSquad, addToSquad } from './../../api/squads'
import SquadCard from './../SquadCard/SquadCard.js'
import Button from 'react-bootstrap/Button'

// import messages from '../AutoDismissAlert/messages'

const ShowPokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const [squads, setSquads] = useState([])

  const { user, match } = props

  useEffect(() => {
    !pokemon && showOnePokemon(match.params.id)
      .then(res => setPokemon(res.data.pokemon))
      .then(res => user && indexAllSquads(user))
      .then(res => setSquads(res.data.squads))
      .catch(console.error)
    console.log(squads)
  })

  const handleClick = () => {
    createSquad(user, pokemon)
      .then(res => indexAllSquads(user))
      .then(res => setSquads(res.data.squads))
      .catch(console.error)
  }

  const onAdd = async (sid, pid, u) => {
    try {
      await addToSquad(sid, pid, u)
    } catch (error) {
      console.error('Pokemon already exists')
    }

    indexAllSquads(u)
      .then(res => {
        console.log(res.data)
        // setThisSquad(res.data)
        setSquads(res.data.squads)
      })
  }

  return (
    <main className="show-page">
      <h1>{pokemon && pokemon.name}</h1>
      <img src={pokemon && pokemon.image} />
      {user && squads && squads.map(squad => {
        return <SquadCard
          key={squad._id}
          id={squad._id}
          squad={squad}
          showingPoke={pokemon}
          user={user}
          useVisit={true}
          onAdd={onAdd}
        />
      })}
      {user && <Button variant="outline-success" onClick={handleClick}>Add to a new Squad</Button>}
    </main>
  )
}

export default withRouter(ShowPokemon)
