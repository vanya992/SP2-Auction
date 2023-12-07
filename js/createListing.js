const LISTINGS = "https://api.noroff.dev/api/v1/auction/listings";
import { logOutButton } from "./logOut.js";

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

    const media = mediaPost ? [mediaPost] : [];

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
      document.getElementById("media").value = "";
      document.getElementById("tag").value = "";
      document.getElementById("description").value = "";
    } catch (error) {
      console.error(error);
      alert("Error creating the listing. Please try again.");
    }
  });
