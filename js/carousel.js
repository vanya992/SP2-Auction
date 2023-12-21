import { LISTINGS } from "./api/constants.js";
import { logOutButton } from "./logOut.js";

logOutButton();

const carousels = document.querySelectorAll(".carousel");

const defaultCardWidth = 200;

function getCardWidth(carousel) {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    return carousel.offsetWidth / 5;
  } else if (screenWidth >= 768) {
    return carousel.offsetWidth / 3;
  } else {
    return carousel.offsetWidth;
  }
}

carousels.forEach((carousel) => {
  const arrowLeft = carousel.parentElement.querySelector(".fa-angle-left");
  const arrowRight = carousel.parentElement.querySelector(".fa-angle-right");

  function getCardWidth(carousel) {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return carousel.offsetWidth / 5;
    } else if (screenWidth >= 768) {
      return carousel.offsetWidth / 3;
    } else {
      return carousel.offsetWidth;
    }
  }

  arrowLeft.addEventListener("click", () => {
    if (carousel.scrollLeft === 0) {
      carousel.scrollLeft = carousel.scrollWidth;
      setTimeout(() => {
        carousel.scrollLeft -= getCardWidth(carousel);
      }, 10);
    } else {
      carousel.scrollLeft -= getCardWidth(carousel);
    }
  });

  arrowRight.addEventListener("click", () => {
    carousel.scrollLeft += getCardWidth(carousel);

    setTimeout(() => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.scrollLeft = 0;
      }
    }, 200);
  });

  let isDragStart = false,
    prevPageX,
    prevScrollLeft;

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
  };

  const dragStop = () => {
    isDragStart = false;
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("mouseleave", dragStop);
});

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

function renderCarouselItems(data, carousel) {
  data.forEach((item) => {
    const imgElement = document.createElement("img");
    const anchorElement = document.createElement("a");
    const pageUrl = `./listings/listing.html?id=${item.id}`;
    anchorElement.href = pageUrl;
    imgElement.src = item.media;
    imgElement.alt = item.title;
    anchorElement.appendChild(imgElement);
    carousel.appendChild(anchorElement);
  });
}

async function initializeCarousels() {
  const newestPostsData = await fetchData(
    `${LISTINGS}?limit=8&sort=created&_bids=true&_active=true`
  );
  const newestPostsCarousel = document.querySelector("#carousel-1");
  renderCarouselItems(newestPostsData, newestPostsCarousel);

  const expiringPostsData = await fetchData(
    `${LISTINGS}?limit=8&sort=endsAt&sortOrder=asc&_bids=true&_active=true`
  );
  const expiringPostsCarousel = document.querySelector("#carousel-2");

  if (!newestPostsCarousel || !expiringPostsCarousel) {
    console.error("Carousel elements not found");
    return;
  }

  renderCarouselItems(expiringPostsData, expiringPostsCarousel);
}

initializeCarousels();
