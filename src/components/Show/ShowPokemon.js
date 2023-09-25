import React, { useEffect, useState } from "react";

import { withRouter } from "react-router";
import { showOnePokemon } from "./../../api/pokemon";
import { indexAllSquads, createSquad, addToSquad } from "./../../api/squads";
import SquadCard from "./../SquadCard/SquadCard.js";
import messages from "../AutoDismissAlert/messages";

const ShowPokemon = (props) => {
  const [pokemon, setPokemon] = useState(null);
  const [squads, setSquads] = useState([]);

  const { user, match, msgAlert } = props;

  useEffect(() => {
    !pokemon &&
      showOnePokemon(match.params.id)
        .then((res) => setPokemon(res.data.pokemon))
        .then(() => user && indexAllSquads(user))
        .then((res) => setSquads(res.data.squads))
        .then(() =>
          msgAlert({
            heading: "Show Pokemon success",
            message: messages.showPokemonSuccess,
            variant: "success",
          })
        )
        .catch((error) => {
          user &&
            msgAlert({
              heading: "Show Pokemon error: " + error.message,
              message: messages.showPokemonFailure,
              variant: "danger",
            });
        });
  });

  const handleClick = () => {
    createSquad(user, pokemon)
      .then((res) => indexAllSquads(user))
      .then((res) => setSquads(res.data.squads))
      .then(() =>
        msgAlert({
          heading: "Create Success",
          message: messages.createSquadSuccess,
          variant: "success",
        })
      )
      .catch((error) => {
        msgAlert({
          heading: "Create failed with error: " + error.message,
          message: messages.createSquadFailure,
          variant: "danger",
        });
      });
  };

  const onAdd = async (sid, pid, u) => {
    addToSquad(sid, pid, u)
      .then(() => indexAllSquads(u))
      .then((res) => setSquads(res.data.squads))
      .then(() =>
        msgAlert({
          heading: "Update Success",
          message: messages.addToSquadSuccess,
          variant: "success",
        })
      )
      .catch((error) => {
        msgAlert({
          heading: "Add Pokemon failed with error: " + error.message,
          message: messages.addToSquadFailure,
          variant: "danger",
        });
      });
  };

  return (
    <section className="show-page">
      {pokemon && (
        <div className="poke-stats">
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} />
          {user && (
            <button className="d-block add-to-new-squad" onClick={handleClick}>
              Add to a new Squad
            </button>
          )}
          <ul>
            <li>Type: {pokemon.type.toUpperCase()}</li>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>
              Moves:{" "}
              {
                <ul>
                  {pokemon.moves.map((move) => {
                    return <li key={move}>{move}</li>;
                  })}
                </ul>
              }
            </li>
          </ul>
        </div>
      )}
      <div className="squad-section">
        {user &&
          squads &&
          squads.map((squad) => {
            return (
              <SquadCard
                key={squad._id}
                id={squad._id}
                squad={squad}
                showingPoke={pokemon}
                user={user}
                useVisit={true}
                onAdd={onAdd}
              />
            );
          })}
      </div>
    </section>
  );
};

export default withRouter(ShowPokemon);
