import React, { Fragment, useState, useEffect } from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import IndexPokemon from './components/Index/IndexPokemon'
import ShowPokemon from './components/Show/ShowPokemon'
import ShowSquad from './components/Show/ShowSquad'
import IndexSquads from './components/Index/IndexSquads'
import HomePage from './components/HomePage/HomePage'

const App = (props) => {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  const clearUser = () => setUser(null)

  const deleteAlert = (id) => {
      return setMsgAlerts(msgAlerts.filter((msg) => msg.id !== id));
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts([...msgAlerts, {heading, message, variant, id}])
  }
    !user && localStorage.removeItem('token')
  
  useEffect(() => {

  }, [user])

    return (
      <Fragment>
        <Header user={user} />
        <div className="hero" />
        {msgAlerts.map((alert) => (
          <AutoDismissAlert
            key={alert.id}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
            id={alert.id}
            deleteAlert={deleteAlert}
          />
        ))}
        <main className="container">
          <Router>
            <Switch>
              <Route
                path="/sign-up"
                render={() => <SignUp msgAlert={msgAlert} setUser={setUser} />}
              />
              <Route
                path="/sign-in"
                render={() => <SignIn msgAlert={msgAlert} setUser={setUser} />}
              />
              <AuthenticatedRoute
                user={user}
                path="/sign-out"
                render={() => (
                  <SignOut
                    msgAlert={msgAlert}
                    clearUser={clearUser}
                    user={user}
                  />
                )}
              />
              <AuthenticatedRoute
                user={user}
                path="/change-password"
                render={() => (
                  <ChangePassword msgAlert={msgAlert} user={user} />
                )}
              />
              <Route
                user={user}
                exact
                path={"/pokemon"}
                render={() => <IndexPokemon msgAlert={msgAlert} user={user} />}
              />
              <Route
                user={user}
                exact
                path={"/pokemon/:id"}
                render={() => <ShowPokemon msgAlert={msgAlert} user={user} />}
              />
              <AuthenticatedRoute
                user={user}
                exact
                path={"/squads"}
                render={() => <IndexSquads msgAlert={msgAlert} user={user} />}
              />
              <AuthenticatedRoute
                user={user}
                exact
                path={"/squads/:id"}
                render={() => <ShowSquad msgAlert={msgAlert} user={user} />}
              />
              <Route
                user={user}
                exact
                path={"/"}
                render={() => <HomePage user={user} />}
              />
            </Switch>
          </Router>
        </main>
      </Fragment>
    );
  }

export default App
