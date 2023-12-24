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
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((userPosts) => {
      const userListings = document.getElementById("userBids");
      let listingsHtml = "";

      userPosts.forEach((post) => {
        if (post.media && post.title && post.endsAt) {
          const timeRemaining = updateListingEndTime(post.endsAt);
          listingsHtml += `<div class="listing">
                             <img src="${post.media[0]}" class="listing-image" alt="Listing image"> 
                             <div class="card-body">
                               <h5 class="card-title">${post.title}</h5>
                               <p class="card-text mt-auto">Ends in: ${timeRemaining}</p>
                               <a href="../listings/listing.html?id=${post.id}"><button class="btn btn-primary">Details</button></a>
                             </div>
                           </div>`;
        }
      });

      userListings.innerHTML = listingsHtml;
    })
    .catch((error) => {
      console.error("Error fetching user posts:", error);
    });
}

function updateAvatar() {
  const avatarForm = document.getElementById("avatarUpdateForm");
  avatarForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newAvatarUrl = document.getElementById("newAvatarUrl").value;
    const userName = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    fetch(PROFILE + `/${userName}/media`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: newAvatarUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.avatar === newAvatarUrl) {
          alert("Avatar updated successfully!");
          displayUserProfile();
        } else {
          alert("Failed to update avatar.");
        }
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  });
}

updateAvatar();
displayUserProfile();
