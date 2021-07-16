import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const SquadCard = squad => (
  <Card className="card squad-card" key={squad.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{squad.id}</Card.Title>
      <Card.Text className="card-text">
        Squad
      </Card.Text>
      <Button variant="outline-success"><Link className="button-link" to={`/pokemon/${squad.id}`}>Check out this pokemon</Link></Button>
    </Card.Body>
  </Card>
)

export default withRouter(SquadCard)
