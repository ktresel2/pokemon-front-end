import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const PokemonCard = props => {
  return <Card className="card pokemon-card" key={props.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{props.name}</Card.Title>
      <Card.Img className="card-image" variant="top" src={props.image} alt={props.name}/>
      <div className="card-text">
        <p>Type: {props.type}</p>
        <p><span>Height: {props.height}</span> <span>Weight: {props.weight}</span></p>
        <p>PokeId: #{props.pokeId}</p>
        <p>PokeId: #{props.pokeId}</p>
      </div>
      <div className="buttons">
        <button className="checkout-btn"><Link className="button-link" to={`/pokemon/${props.id}`}>Check out this pokemon</Link></button>
        {props.delete &&
      <button
        className="delete-btn"
        onClick={() => props.deletePokeFromSquad(props.squad._id, props.id, props.user)}
      >Delete {props.name} from this Squad
      </button>
        }
      </div>
    </Card.Body>
  </Card>
}

export default withRouter(PokemonCard)
