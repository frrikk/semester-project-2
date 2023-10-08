import { baseUrl } from "./misc.js";

export const getHero = async () => {
  const heroContainer = document.querySelector(".hero");
  const heroImageUrl = baseUrl + "/home";

  const response = await fetch(heroImageUrl);
  const data = await response.json();

  heroContainer.innerHTML = renderHero(baseUrl + data.hero_banner.url);
};

export const renderHero = (image) => {
  return `
    <div class="hero__container">
        <img src="${image}" alt="hero-image">
    </div>
  `;
};
