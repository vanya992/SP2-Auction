import { LISTINGS } from "./api/constants.js";

import { logOutButton } from "./logOut.js";

logOutButton();

const token = localStorage.getItem("token");

async function getListings(listings) {
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

    const listings = document.querySelector(".listings");
    listings.innerHTML = "";

    data.forEach((listing) => {
      const column = document.createElement("div");
      column.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
      const bids = document.createElement("div");
      bids.className = "card h-100 m-2";
      console.log(listing.media);
      const imageSrc =
        Array.isArray(listing.media) && listing.media.length > 0
          ? listing.media[0]
          : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";

      bids.innerHTML = `<img src="${imageSrc}" class=" card-img-top thumbnail " alt="Listing image">
                            <div class="card-body">
                            <h5 class="card-title">${listing.title}</h5>
                            <p class="card-text">${listing.description}</p>
                            <p class="card-text mt-auto">Ends: ${listing.endsAt}</p>
                            <button class="btn btn-outline-success"> Bid </button>
                            </div>
                            `;
      column.appendChild(bids);
      listings.appendChild(column);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getListings();
