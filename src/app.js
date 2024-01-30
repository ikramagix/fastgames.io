import React, { useEffect, useState } from "react";

  function PageList() {
    const [games, setGames] = useState([]);
    const API_KEY = '397ef01138b4459d8c87af398f1a6506'; 
  
    useEffect(() => {
      fetchGames().then(data => setGames(data.results));
    }, []);
  
    async function fetchGames() {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
      const data = await response.json();
      return data;
    }
  
    return (
      <div className="page-list">
        <h2>Liste de jeux</h2>
        <ul>
          {games.map(game => (
            <li key={game.id}>
              <h3>{game.name}</h3>
              <p>Description: {game.description}</p>
              <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
              <p>Date de sortie: {game.released}</p>
              <p>Plateformes: {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  function App() {
    return (
      <div>
        <h1>Bienvenue sur <em>fastgames.io</em></h1>
        <PageList />
      </div>
    );
  }
  
  export default App;  