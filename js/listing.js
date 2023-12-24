import { LISTINGS } from "./api/constants.js";
import { placeBid } from "./bid.js";
import { updateListingEndTime } from "./date.js";
import { logOutButton } from "./logOut.js";

logOutButton();

function displaySinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    console.error("Post ID not provided in URL.");
    return;
  }

  const token = localStorage.getItem("token");

  fetch(`${LISTINGS}/${listingId}?_bids=true&_seller=true&_active=true`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the specific post.");
      }
      return response.json();
    })

    .then((listing) => {
      const listingContainer = document.getElementById("singleListing");

      const endTime = new Date(listing.endsAt);
      const now = new Date();

      if (listing) {
        const images = Array.isArray(listing.media)
          ? listing.media
          : [
              listing.media ||
                "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg",
            ];

        const imageSliderHtml = images
          .map(
            (src, index) =>
              `<div class="slide ${index === 0 ? "active" : ""}">
                 <img src="${src}" class="listing-image" alt="Listing Image">
              </div>`
          )
          .join("");

        const seller = listing.seller;

        const arrowsHtml =
          images.length > 1
            ? `<a class="prev">&#10094;</a>
             <a class="next">&#10095;</a>`
            : "";

        const timeRemaining = updateListingEndTime(listing.endsAt);

        const highestBid =
          listing.bids && listing.bids.length > 0
            ? Math.max(...listing.bids.map((bid) => bid.amount))
            : 0;

        let bidsHtml = "<p>No bids on this listing yet.</p>";
        if (listing.bids && listing.bids.length > 0) {
          const sortedBids = listing.bids.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );
          const lastThreeBids = sortedBids.slice(0, 3);

          bidsHtml = `
                <h3>Recent Bids</h3>
                <div class="bids-container">
                  ${lastThreeBids
                    .map(
                      (bid) => `
                    <div class="bid">
                      <span class="bidder-name">${bid.bidderName}</span>
                      <span class="bid-amount">$${bid.amount}</span>
                      <span class="bid-date">${new Date(
                        bid.created
                      ).toLocaleString()}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              `;
        }

        listingContainer.innerHTML = `
        <div class="listing">
          <div id="myCustomSlider" class="image-slider card-img-top">
            ${arrowsHtml}
            ${imageSliderHtml}
          </div>
          <div class="listing-details">
            <h1>${listing.title}</h1>
            <h3> Seller: ${seller.name}</h3>
            <p>${listing.description}</p>
            <p>Highest bid: ${highestBid}</p>
            <p>Ends in: ${timeRemaining}</p>
            <section class="bid-input"><input type="number" id="bidAmount"><button class="btn btn-primary" id="bidButton">Bid</button></section>
            <div id="bidMessage"></div>
            ${bidsHtml}
          </div>
        </div>
      `;

        attachBidButtonEventListener(listingId, highestBid);
        attachArrowListeners();
      } else {
        listingContainer.innerHTML = "<p>Post not found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching the specific post:", error);
    });
}

function attachBidButtonEventListener(listingId, highestBid) {
  setTimeout(() => {
    const bidButton = document.getElementById("bidButton");
    if (bidButton) {
      bidButton.addEventListener("click", function () {
        const bidAmountInput = document.getElementById("bidAmount");
        const bidAmount = bidAmountInput
          ? parseFloat(bidAmountInput.value)
          : null;

        if (bidAmount && bidAmount > highestBid) {
          placeBid(listingId, bidAmount);
        } else {
          alert("Your bid must be higher than the current highest bid.");
        }
      });
    } else {
      console.error("Bid button not found");
    }
  }, 0);
}

let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll(".image-slider .slide");
  if (slides.length === 0) return;

  console.log("Current slide index before change:", currentSlide);
  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + direction + slides.length) % slides.length;

  console.log("Current slide index after change:", currentSlide);
  slides[currentSlide].classList.add("active");

  // Check the classes of all slides
  slides.forEach((slide, index) => {
    console.log(`Slide ${index}:`, slide.classList);
  });
}

function attachArrowListeners() {
  const prevButton = document.querySelector(".image-slider .prev");
  const nextButton = document.querySelector(".image-slider .next");

  if (prevButton) {
    prevButton.addEventListener("click", () => moveSlide(-1));
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => moveSlide(1));
  }
}

moveSlide();
displaySinglePost();
