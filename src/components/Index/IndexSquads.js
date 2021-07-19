import React, { useState, useEffect } from 'react'
import { indexAllSquads } from './../../api/squads'
import SquadCard from './../SquadCard/SquadCard'

export default function IndexSquads (props) {
  const [squads, setSquads] = useState(null)

  const { user } = props

  useEffect(() => {
    !squads && indexAllSquads(user)
      .then(res => {
        console.log(res.data.squads)
        setSquads(res.data.squads)
      })
  })

  return <main className="d-grid main-index">
    {user && squads && squads.map(squad => {
      return <SquadCard
        key={squad._id}
        id={squad._id}
        squad={squad}
        user={user}
      />
    })}
  </main>
}
