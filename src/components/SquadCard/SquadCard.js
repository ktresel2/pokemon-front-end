import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { addToSquad } from './../../api/squads'

const SquadCard = (props) => {
  const [thisSquad, setThisSquad] = useState(null)

  useEffect(() => (
    !thisSquad ? setThisSquad(props.pokemon) : setThisSquad(thisSquad)
  ))

  const onAdd = () => {
    addToSquad(props.id, props.showingPoke._id, props.user)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        setThisSquad(res.data.squad.pokemon)
        return res
      }
      ).then(res => console.log(res, thisSquad))
  }

  console.log(thisSquad)

  return thisSquad && <Card className="card squad-card" key={thisSquad.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{thisSquad.id}</Card.Title>
      <Button onClick={onAdd} variant="outline-primary">Add {props.showingPoke.name} to this Squad</Button>
      <Card.Text className="card-text">
        {thisSquad.map(poke => {
          console.log(poke)
          return <img key={poke.id} src={poke.image}/>
        })}
      </Card.Text>
      <Button variant="outline-success" onClick={() => props.history.push(`/squads/${props.id}`)}>Visit this squad</Button>
    </Card.Body>
  </Card>
}

export default withRouter(SquadCard)
