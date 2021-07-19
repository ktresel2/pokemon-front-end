import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const PokemonCard = props => {
  return <Card className="card pokemon-card" key={props.id}>
    <Card.Img className="card-image" variant="top" src={props.image}/>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{props.name}</Card.Title>
      <Card.Text className="card-text">
        {props.type}
      </Card.Text>
      <Button variant="outline-success"><Link className="button-link" to={`/pokemon/${props.id}`}>Check out this pokemon</Link></Button>
      {props.delete &&
      <Button
        onClick={() => props.deletePokeFromSquad(props.squad._id, props.id, props.user)}
        variant="outline-primary">Delete {props.name} to this Squad
      </Button>
      }
    </Card.Body>
  </Card>
}

export default withRouter(PokemonCard)
