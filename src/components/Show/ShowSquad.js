import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { showOneSquad, deleteFromSquad, deleteSquad } from './../../api/squads'
import Button from 'react-bootstrap/Button'
import PokemonCard from './../PokemonCard/PokemonCard'
// import messages from '../AutoDismissAlert/messages'

const ShowSquad = props => {
  const [squad, setSquad] = useState(null)

  const { user, match, history } = props

  useEffect(() => {
    console.log(user, squad)
    !squad && showOneSquad(match.params.id, user)
      .then(res => {
        console.log(res.data)
        setSquad(res.data.squad)
      })
      .catch(console.error)
  })

  const deletePokeFromSquad = (sid, pid, u) => {
    deleteFromSquad(sid, pid, u)
      .then(showOneSquad(match.params.id, user))
      .then(res => setSquad(res.data.squad))
      .catch(console.error)
  }

  const deleteThisSquad = async (sid, u) => {
    await deleteSquad(sid, u)
    await history.push('/squads')
  }

  return (
    <main className="d-grid main-index">
      <Button onClick={() => deleteThisSquad(squad._id, user)}>Delete this Squad</Button>
      {squad && squad.pokemon.map(poke => {
        return <PokemonCard
          key={poke._id}
          id={poke._id}
          name={poke.name}
          image={poke.image}
          type={poke.type}
          pokeId={poke.pokeId}
          useDelete={true}
          squad={squad}
          delete={true}
          user={user}
          deletePokeFromSquad={deletePokeFromSquad}
        />
      })}
      {squad && squad.pokemon.length === 0 && <h1>You have no pokemon in this squad! To to the store to add some.</h1>}
    </main>
  )
}

export default withRouter(ShowSquad)
