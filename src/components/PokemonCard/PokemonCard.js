import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const PokemonCard = pokemon => (
  <Card className="card" key={pokemon._id}>
    <Card.Img className="card-image" variant="top" src={pokemon.image}/>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{pokemon.name}</Card.Title>
      <Card.Text className="card-text">
        {pokemon.type}
      </Card.Text>
      <Button variant="outline-success"><Link className="button-link" to={`/pokemon/${pokemon.id}`}>Check out this pokemon</Link></Button>
    </Card.Body>
  </Card>
)

export default withRouter(PokemonCard)
