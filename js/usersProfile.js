import { PROFILE } from "./api/constants.js";
import { LISTINGS } from "./api/constants.js";
import { logOutButton } from "./logOut.js";
import { updateListingEndTime } from "./date.js";

logOutButton();

function displayUserProfile() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  if (!token || !userName) {
    console.error("User is not authenticated.");
    return;
  }

  fetch(PROFILE + `/${userName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((userData) => {
      if (userData) {
        displayProfileInfo(userData);

        fetchAndDisplayUserPosts(token, userData.name);
      } else {
        console.error("No profile found for the user.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
}

function displayProfileInfo(userData) {
  const userProfile = document.getElementById("user");

  userProfile.innerHTML = `<div><img src=${userData.avatar} class="profile-avatar"></img></div>
                            <div><h5>${userData.name}</h5>
                            <p>Credit: ${userData.credits}</p>`;
}

function fetchAndDisplayUserPosts(token, userName) {
  fetch(PROFILE + `/${userName}/listings`, {
    // Adjust this line as per your API
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((userPosts) => {
      const userListings = document.getElementById("userBids");
      let listingsHtml = "<div><h3>My Listings</h3></div>";

      userPosts.forEach((post) => {
        const timeRemaining = updateListingEndTime(post.endsAt);
        listingsHtml += `<div class="profile-listing-card">
                             <img src="${post.media}" class="listing-image" alt="Listing image">
                             <div class="card-body">
                               <h5 class="card-title">${post.title}</h5>
                               <p class="card-text mt-auto">Ends in: ${timeRemaining}</p>
                               <a href="../listings/listing.html?id=${post.id}"><button class="btn btn-outline-success">Details</button>
                             </div>
                           </div>`;
      });

      userListings.innerHTML = listingsHtml;
    })
    .catch((error) => {
      console.error("Error fetching user posts:", error);
    });
}

displayUserProfile();
