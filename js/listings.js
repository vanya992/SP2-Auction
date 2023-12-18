import { LISTINGS } from "./api/constants.js";
import { updateListingEndTime } from "./date.js";
import { logOutButton } from "./logOut.js";

logOutButton();

const token = localStorage.getItem("token");

function trimText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

async function getListings() {
  try {
    const response = await fetch(LISTINGS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const listingsElement = document.querySelector(".listings");
    listingsElement.innerHTML = "";

    data.forEach((listing) => {
      const column = document.createElement("div");
      column.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

      const postUrl = `./listing.html?id=${listing.id}?_bids=true&_seller=true&_active=true`;

      const endTime = new Date(listing.endsAt);
      const now = new Date();

      const maxTitleLength = 20;
      const maxDescriptionLength = 20;

      const trimmedTitle = trimText(listing.title, maxTitleLength);
      const trimmedDescription = trimText(
        listing.description,
        maxDescriptionLength
      );

      if (endTime > now) {
        const bids = document.createElement("div");
        bids.className = "card h-100 m-2";

        const imageSrc =
          Array.isArray(listing.media) && listing.media.length > 0
            ? listing.media[0]
            : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";

        console.log(postUrl);

        const timeRemaining = updateListingEndTime(listing.endsAt);

        bids.innerHTML = `<img src="${imageSrc}" class="card-img-top thumbnail" alt="Listing image">
                            <div class="card-body">
                              <h5 class="card-title">${trimmedTitle}</h5>
                              <p class="card-text">${trimmedDescription}</p>
                              <p class="card-text mt-auto">Ends: ${timeRemaining}</p></div>
                              <a href="listing.html?id=${listing.id}"><button id="button" class="btn btn-success">Details</button>
                            </a>`;

        column.appendChild(bids);
        listingsElement.appendChild(column);
      }
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getListings();
