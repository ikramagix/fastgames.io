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
  const API_KEY = "397ef01138b4459d8c87af398f1a6506"; 

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
        return null; // Logo par défaut si le slug n'est pas trouvé
    }
  }

  return (
    <div className="page-list">
      {/* Affichez ici la liste de jeux en utilisant la variable 'games' */}
    </div>
  );
}

export default PageList;
