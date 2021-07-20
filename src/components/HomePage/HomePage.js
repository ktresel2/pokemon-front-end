import React from 'react'
import { withRouter } from 'react-router-dom'

const HomePage = props => {
  const { history, user } = props
  return <section>
    {!user && <div className="homepage">
      <h1>Welcome to the Pokemon Trading Database!</h1>
      <h2>Create your own squads of G1 Pokemon.</h2>
      <button onClick={() => history.push('/pokemon')}>Check out the Shop</button>
    </div>}
    {user && <div className="homepage">
      {user && <h1>Welcome back, {user.name}</h1>}
      <button onClick={() => history.push('/pokemon')}>Head to the Shop</button>
    </div>}
  </section>
}

export default withRouter(HomePage)
