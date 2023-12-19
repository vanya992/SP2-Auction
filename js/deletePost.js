import { LISTINGS } from "./api/constants.js";

import { displayMessage } from "./displayErrorMessage.js";

export async function deleteListing(id) {
  const areUsure = confirm("Are you sure you want to delete this listing?");
  const token = localStorage.getItem("token");
  const url = LISTINGS + id;

  if (areUsure) {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response) {
        displayMessage(
          "success",
          "Listing was successfully deleted",
          ".create-listing-message-container"
        );
      }
    } catch (error) {
      displayMessage(
        "error",
        "Ooppps!! something went wrong, please try updating the page",
        ".create-listing-message-container"
      );
    }
  }
}
