import React, { useEffect, useState } from "react";

function PageList() {
  const [games, setGames] = useState([]);
  const API_KEY = "397ef01138b4459d8c87af398f1a6506"; // Remplacez avec votre clé API réelle

  useEffect(() => {
    // Effectuez ici votre appel API pour récupérer la liste de jeux
    fetchGames().then((data) => setGames(data));
  }, []);

  async function fetchGames() {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2024-12-31&ordering=-added&page_size=9`
    );
    const data = await response.json();
    const games = data.results.map((game) => ({
      name: game.name,
      description: game.description,
      releaseDate: game.released,
      developers: game.developers.map((developer) => developer.name),
      tags: game.tags.map((tag) => tag.name),
      genres: game.genres.map((genre) => genre.name),
      publisher: game.publisher,
      platforms: game.platforms.map((platform) => platform.platform.name),
      website: game.website,
      averageRating: game.rating,
      numberOfRatings: game.ratings_count,
      screenshots: game.short_screenshots.slice(0, 4),
      buyLinks: game.stores.map((store) => ({
        name: store.store.name,
        link: store.url,
      })),
    }));

    return games;
  }

  return (
    <div className="page-list">
      {games.map((game, index) => (
        <div className="card" key={index}>
          <h2>{game.name}</h2>
          <p>{game.description}</p>
          <p>Date de sortie : {game.releaseDate}</p>
          <p>Développeurs : {game.developers.join(", ")}</p>
          <p>Tags : {game.tags.join(", ")}</p>
          <p>Genres : {game.genres.join(", ")}</p>
          <p>Éditeur : {game.publisher}</p>
          <p>Plateformes : {game.platforms.join(", ")}</p>
          <p>Site Web : <a href={game.website}>{game.website}</a></p>
          <p>Évaluation moyenne : {game.averageRating}</p>
          <p>Nombre d'évaluations : {game.numberOfRatings}</p>
          <div>
            {game.screenshots.map((screenshot, idx) => (
              <img src={screenshot.image} alt={`Screenshot ${idx + 1}`} key={idx} />
            ))}
          </div>
          <div>
            {game.buyLinks.map((link, idx) => (
              <a href={link.link} key={idx}>{link.name}</a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PageList;
