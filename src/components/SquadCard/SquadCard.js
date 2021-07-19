import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const SquadCard = (props) => {
  const { user, onAdd, showingPoke, history, id, squad } = props
  console.log(showingPoke)

  // const mapSquad = () => {
  //   const arr = []
  //   squad.pokemon.map(poke => {
  //     arr.push(poke.id)
  //   })
  //   return arr
  // }
  //
  // const blah = mapSquad()

  return user && <Card className="card squad-card" key={id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{id}</Card.Title>
      {showingPoke &&
      <Button onClick={() => onAdd(id, showingPoke._id, user)} variant="outline-primary">Add {showingPoke.name} to this Squad</Button>
      }
      <Card.Text className="card-text">
        {squad.pokemon.map(poke => {
          console.log(poke)
          return <img key={poke.id} src={poke.image}/>
        })}
      </Card.Text>
      <Button variant="outline-success" onClick={() => history.push(`/squads/${props.id}`)}>Visit this squad</Button>
    </Card.Body>
  </Card>
}

export default withRouter(SquadCard)
