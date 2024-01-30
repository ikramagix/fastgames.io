import React, { useEffect, useState } from "react";

// Importez les logos SVG depuis le dossier src/logos
import linuxLogo from "./logos/linux.svg";
import mobileLogo from "./logos/mobile.svg";
import ps4Logo from "./logos/ps4.svg";
import switchLogo from "./logos/switch.svg";
import windowsLogo from "./logos/windows.svg";
import xboxLogo from "./logos/xbox.svg";

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
      image: game.background_image,
      description: game.description,
      releaseDate: game.released,
      developers: game.developers.map((developer) => ({
        name: developer.name,
        link: developer.games_count > 0 ? `/developer/${developer.slug}` : null,
      })),
      tags: game.tags.map((tag) => ({
        name: tag.name,
        link: `/tag/${tag.slug}`,
      })),
      genres: game.genres.map((genre) => ({
        name: genre.name,
        link: `/genre/${genre.slug}`,
      })),
      publisher: game.publisher,
      platforms: game.platforms.map((platform) => ({
        name: platform.platform.name,
        logo: getPlatformLogo(platform.platform.slug), // Utilisez la fonction pour obtenir le logo
        link: `/platform/${platform.platform.slug}`,
      })),
      website: game.website,
      video: game.clip ? game.clip.clip : null,
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

  // Fonction pour obtenir le logo de plateforme en fonction du slug
  function getPlatformLogo(slug) {
    switch (slug) {
      case "linux":
        return linuxLogo;
      case "mobile":
        return mobileLogo;
      case "playstation4":
        return ps4Logo;
      case "xbox":
        return xboxLogo;
      case "windows":
        return windowsLogo;
      case "switch":
        return switchLogo;
      default:
        return null; 
    }
  }

  return (
    <div className="page-list">
      return (
      <div className="page-list">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <img src={game.image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <p>Date de sortie : {game.releaseDate}</p>
            <p>Éditeur : {game.publisher}</p>
            <p>Plateformes :</p>
            <ul>
              {game.platforms.map((platform, platformIndex) => (
                <li key={platformIndex}>
                  <img src={platform.logo} alt={platform.name} />
                  <a href={platform.link}>{platform.name}</a>
                </li>
              ))}
            </ul>
            <p>Genres :</p>
            <ul>
              {game.genres.map((genre, genreIndex) => (
                <li key={genreIndex}>
                  <a href={genre.link}>{genre.name}</a>
                </li>
              ))}
            </ul>
            <p>
              Site Web : <a href={game.website}>{game.website}</a>
            </p>
            {game.video && <video controls src={game.video}></video>}
            <p>Moyenne des notes : {game.averageRating}</p>
            <p>Nombre de notes : {game.numberOfRatings}</p>
            <p>Aperçus :</p>
            <div className="screenshots">
              {game.screenshots.map((screenshot, screenshotIndex) => (
                <img
                  key={screenshotIndex}
                  src={screenshot.image}
                  alt={`Screenshot ${screenshotIndex + 1}`}
                />
              ))}
            </div>
            <p>Liens d'achat :</p>
            <ul>
              {game.buyLinks.map((buyLink, linkIndex) => (
                <li key={linkIndex}>
                  <a href={buyLink.link}>{buyLink.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      );
    </div>
  );
}

export default PageList;
