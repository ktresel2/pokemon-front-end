import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { deleteSquad } from './../../api/squads'

const SquadCard = (props) => {
  const { user, onAdd, showingPoke, history, id, squad } = props

  return user && <Card className="card squad-card" key={id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{id}</Card.Title>
      {showingPoke &&
      <Button onClick={() => onAdd(id, showingPoke._id, user)} variant="outline-primary">Add {showingPoke.name} to this Squad</Button>
      }
      <Button variant="outline-success" onClick={() => history.push(`/squads/${props.id}`)}>Visit Squad</Button>
      <Button variant="danger" onClick={() => deleteSquad(id, user)}>Delete Squad</Button>
      <Card.Text className="card-text">
        {squad.pokemon.map(poke => {
          console.log(poke)
          return <img key={poke.id} src={poke.image}/>
        })}
      </Card.Text>
    </Card.Body>
  </Card>
}

export default withRouter(SquadCard)
