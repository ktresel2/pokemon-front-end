import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const PokemonCard = props => {
  return <Card className="card pokemon-card" key={props.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title"><span className="pokename">{props.name}</span></Card.Title>
      <Card.Img className="card-image" variant="top" src={props.image} alt={props.name}/>
      <div className="card-text">
        <p>Type: {props.type}</p>
        <p><span>Height: {props.height}</span> :: <span>Weight: {props.weight}</span></p>
        <p>PokeId: #{props.pokeId}</p>
      </div>
      <div className="buttons">
        <button className="checkout-btn" onClick={() => props.history.push(`/pokemon/${props.id}`)}>Check out <span className="pokename">{props.name}</span></button>
        {props.delete &&
      <button
        className="delete-btn"
        onClick={() => props.deletePokeFromSquad(props.squad._id, props.id, props.user)}
      >Release <span className="pokename">{props.name}</span></button>
        }
      </div>
    </Card.Body>
  </Card>
}

export default withRouter(PokemonCard)
