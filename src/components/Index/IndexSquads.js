import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { indexAllSquads, deleteSquad } from './../../api/squads'
import messages from '../AutoDismissAlert/messages'

import SquadCard from './../SquadCard/SquadCard'

const IndexSquads = (props) => {
  const [squads, setSquads] = useState(null)

  const { user, history, msgAlert } = props

  useEffect(() => {
    !squads && indexAllSquads(user)
      .then(res => setSquads(res.data.squads))
      .then(() => msgAlert({
        heading: 'Index Success',
        message: messages.indexSquadsSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setSquads(null)
        msgAlert({
          heading: 'Index Squads failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  })

  const deleteThisSquad = async (pid, u) => {
    try {
      await deleteSquad(pid, u)
        .then(msgAlert({
          heading: 'Delete squad Success',
          message: messages.deleteSquadSuccess,
          variant: 'success'
        }))
    } catch (error) {
      setSquads(null)
      msgAlert({
        heading: 'Index Squads failed with error: ' + error.message,
        message: messages.changePasswordFailure,
        variant: 'danger'
      })
    }

    indexAllSquads(u)
      .then(res => setSquads(res.data.squads))
      .then(() => {
        msgAlert({
          heading: 'Index Success',
          message: messages.indexSquadsSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        setSquads(null)
        msgAlert({
          heading: 'Index Squads failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  return <main className="d-grid main-index">
    {user && squads && squads.length > 0 && squads.map(squad => {
      return <SquadCard
        key={squad._id}
        id={squad._id}
        squad={squad}
        user={user}
        onDelete={deleteThisSquad}
      />
    })}
    {squads && !squads.length > 0 && <div>
      <h1>You have no squads.</h1>
      <p>Head over to the shop to add some!</p>
      <button onClick={() => history.push('/pokemon')}>Shop</button>
    </div>}
  </main>
}

export default withRouter(IndexSquads)
