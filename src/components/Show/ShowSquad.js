import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { showOneSquad, deleteFromSquad, deleteSquad } from './../../api/squads'
import Button from 'react-bootstrap/Button'
import PokemonCard from './../PokemonCard/PokemonCard'
import messages from '../AutoDismissAlert/messages'

const ShowSquad = props => {
  const [squad, setSquad] = useState(null)

  const { user, match, history, msgAlert } = props

  useEffect(() => {
    !squad && showOneSquad(match.params.id, user)
      .then(res => setSquad(res.data.squad))
      .then(() => msgAlert({
        heading: 'Show squad success',
        message: messages.showSquadSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Index Pokemon failed with error: ' + error.message,
          message: messages.showSquadFailure,
          variant: 'danger'
        })
      })
  })

  const deletePokeFromSquad = (sid, pid, u) => {
    deleteFromSquad(sid, pid, u)
      .then(res => setSquad(res.data.squad))
      .then(() => msgAlert({
        heading: 'Update Success',
        message: messages.deleteFromSquadSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Update failed with error: ' + error.message,
          message: messages.deleteFromSquadFailure,
          variant: 'danger'
        })
      })
  }

  const deleteThisSquad = async (sid, u) => {
    await deleteSquad(sid, u)
    await history.push('/squads')
  }

  return (
    <div>
      <Button className="squad-show-delete-button" variant="danger" onClick={() => deleteThisSquad(squad._id, user)}>Delete this Squad</Button>
      <section className="container grid">
        {squad && squad.pokemon.map(poke => {
          return <PokemonCard
            key={poke._id}
            id={poke._id}
            name={poke.name}
            image={poke.image}
            type={poke.type}
            pokeId={poke.pokeId}
            height={poke.height}
            weight={poke.weight}
            useDelete={true}
            squad={squad}
            delete={true}
            user={user}
            deletePokeFromSquad={deletePokeFromSquad}
          />
        })}
      </section>
      {squad && squad.pokemon.length === 0 && <h1 className="empty-squad">You have no pokemon in this squad! To to the store to add some.</h1>}
    </div>
  )
}

export default withRouter(ShowSquad)
