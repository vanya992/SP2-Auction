const LISTINGS = "https://api.noroff.dev/api/v1/auction/listings";
import { logOutButton } from "./logOut.js";
import { isValidUrl } from "./validation.js";
import { displayErrorMessage } from "./displayErrorMessage.js";
logOutButton();

const token = localStorage.getItem("token");

export async function createListing(token, listingData) {
  console.log("Token:", token);
  console.log("Listing Data:", listingData);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify(listingData);

  console.log("Making request to:", LISTINGS);

  try {
    const response = await fetch(LISTINGS, {
      method: "POST",
      headers,
      body,
    });

    if (response.ok) {
      console.log("Your listing is successfully added.");
      console.log(response.json);
      return response.json();
    } else {
      const errorResponse = await response.text();
      console.error("Server response:", errorResponse);
      throw new Error("There has been an error. Please, try again.");
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("addMoreMedia")
    .addEventListener("click", function () {
      console.log("Add more clicked");
      const container = document.getElementById("mediaInputsContainer");

      const newInput = document.createElement("input");
      newInput.type = "url";
      newInput.name = "image";
      newInput.placeholder = "Add an image of your bidding item";
      newInput.className = "mb-2";

      console.log("Adding new input field");
      container.appendChild(newInput);
    });
});

document
  .getElementById("listingForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const endsAt = document.getElementById("end").value;
    const mediaPost = document.getElementById("media").value;
    const tagsInput = document.getElementById("tag").value;
    const description = document.getElementById("description").value;

    const tags = tagsInput.split(/[\s,]+/).filter((tag) => tag.trim() !== "");

    let isValid = true;
    const mediaInputs = document.querySelectorAll(
      "#mediaInputsContainer input"
    );
    const media = Array.from(mediaInputs)
      .map((input) => {
        if (!isValidUrl(input.value)) {
          isValid = false;
          input.style.borderColor = "red";
          displayErrorMessage(input, "Image URL is not valid.");
        } else {
          input.style.borderColor = "";
          if (
            input.nextElementSibling &&
            input.nextElementSibling.classList.contains("error-message")
          ) {
            input.nextElementSibling.style.display = "none";
          }
        }
        return input.value;
      })
      .filter((url) => url);

    if (!isValid) {
      alert("Please enter valid media URLs");
      return;
    }

    try {
      const newListing = await createListing(token, {
        title,
        description,
        endsAt,
        tags,
        media,
      });

      document.getElementById("title").value = "";
      document.getElementById("end").value = "";
      document.querySelectorAll("#media").value = "";
      document.getElementById("tag").value = "";
      document.getElementById("description").value = "";
    } catch (error) {
      console.error(error);
      alert("Error creating the listing. Please try again.");
    }
  });
