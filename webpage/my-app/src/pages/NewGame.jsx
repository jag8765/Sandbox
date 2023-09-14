import React, { useState } from "react";
import axios from "axios";
import '../App.css';

var isSubmitted = false;

const NewGame = () => {
  const [result, setResult] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "https://regan72xzvix2atk4bna74wmmi0kytjh.lambda-url.us-east-1.on.aws/"
      )
      .then((response) => {
        console.log(response);
        setResult(response)

      })
      .catch((error) => {
        console.log(error);
        setResult("Error!")
      });

    isSubmitted = true;
  }

  return (
    <div className="App">
          <p></p>
          <form onSubmit={e => handleSubmit(e)}>
            <input type="submit" id="submit-button" value="New Game" style={
              { width: "120px", height: "50px", fontSize: 20, fontWeight: 'bold'}
            }></input>
          </form>

          {isSubmitted === true && result['data']['player1_id'] != null &&
              <p>Player 1 ID: {(String(result['data']['player1_id']))}</p>
          }

            {isSubmitted === true && result['data']['player2_id'] != null &&
              <p>Player 2 ID: {(String(result['data']['player2_id']))}</p>
            }

            {isSubmitted === true && result['data']['max_games'] === true &&
              <p>Too many ongoing games! Try again later...</p>
            }
    </div>
  );
}

export default NewGame;