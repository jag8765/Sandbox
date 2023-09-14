import React from 'react';
import logo from '../dogs_chess.png';
import '../App.css';

function Home() {
    return (
        <div className="App">
          <img src={logo} alt="Logo" />
          <p>Welcome to deployment chess. Please choose one of the options above!</p>
        </div>
    );
}

export default Home;
