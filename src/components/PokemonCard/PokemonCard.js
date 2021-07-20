import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const PokemonCard = props => {
  return <Card className="card pokemon-card" key={props.id}>
    <Card.Img className="card-image" variant="top" src={props.image} alt={props.name}/>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{props.name}</Card.Title>
      <div className="card-text">
        <p>{props.type}</p>
        <p>#{props.pokeId}</p>
      </div>
      <button className="checkout-btn"><Link className="button-link" to={`/pokemon/${props.id}`}>Check out this pokemon</Link></button>
      {props.delete &&
      <Button
        onClick={() => props.deletePokeFromSquad(props.squad._id, props.id, props.user)}
        variant="outline-danger">Delete {props.name} to this Squad
      </Button>
      }
    </Card.Body>
  </Card>
}

export default withRouter(PokemonCard)
