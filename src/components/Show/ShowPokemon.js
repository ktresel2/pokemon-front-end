import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { showOnePokemon } from './../../api/pokemon'
import { indexAllSquads, createSquad, addToSquad } from './../../api/squads'
import SquadCard from './../SquadCard/SquadCard.js'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

const ShowPokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const [squads, setSquads] = useState([])

  const { user, match, msgAlert } = props

  useEffect(() => {
    !pokemon && showOnePokemon(match.params.id)
      .then(res => setPokemon(res.data.pokemon))
      .then(() => user && indexAllSquads(user))
      .then(res => setSquads(res.data.squads))
      .then(() => msgAlert({
        heading: 'Show Pokemon Success',
        message: messages.showPokemonSuccess,
        variant: 'success'
      }))
      .catch(error => {
        user && msgAlert({
          heading: 'Show Pokemon error: ' + error.message,
          message: messages.showPokemonFailure,
          variant: 'danger'
        })
      })
  })

  const handleClick = () => {
    createSquad(user, pokemon)
      .then(res => indexAllSquads(user))
      .then(res => setSquads(res.data.squads))
      .then(() => msgAlert({
        heading: 'Create Success',
        message: messages.createSquadSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Create failed with error: ' + error.message,
          message: messages.createSquadFailure,
          variant: 'danger'
        })
      })
  }

  const onAdd = async (sid, pid, u) => {
    addToSquad(sid, pid, u)
      .then(res => indexAllSquads(u))
      .then(res => setSquads(res.data.squads))
      .then(() => msgAlert({
        heading: 'Update Success',
        message: messages.addToSquadSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Add Pokemon failed with error: ' + error.message,
          message: messages.addToSquadFailure,
          variant: 'danger'
        })
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
