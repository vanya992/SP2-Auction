import { logOutButton } from "./logOut.js";

logOutButton();

const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const arrowLeft = carousel.parentElement.querySelector(".fa-angle-left");
  const arrowRight = carousel.parentElement.querySelector(".fa-angle-right");
  const firstCardWidth = carousel.querySelector("img").clientWidth + 10;

  arrowLeft.addEventListener("click", () => {
    carousel.scrollLeft -= firstCardWidth;
  });

  arrowRight.addEventListener("click", () => {
    carousel.scrollLeft += firstCardWidth;
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
