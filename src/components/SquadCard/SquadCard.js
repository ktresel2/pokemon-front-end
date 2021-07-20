import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const SquadCard = (props) => {
  const { user, onAdd, showingPoke, history, id, squad, onDelete } = props

  return user && <Card className="card squad-card mb-3" key={id}>
    <Card.Body className="card-body">
      <Card.Text className="card-text">
        {squad.pokemon.map(poke => <img key={poke._id} src={poke.image}/>)}
      </Card.Text>
      <div className="squad-card-buttons">
        {!showingPoke && <button className="delete-squad-btn" onClick={() => onDelete(id, user)}>Delete Squad</button>}
        {showingPoke && <button className="add-to-squad-btn" onClick={() => onAdd(id, showingPoke._id, user)}>Add {showingPoke.name} to this Squad</button>}
        <button className="visit-squad-btn" onClick={() => history.push(`/squads/${props.id}`)}>Visit Squad</button>
      </div>
    </Card.Body>
  </Card>
}

export default withRouter(SquadCard)
