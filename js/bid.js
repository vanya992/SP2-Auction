import { LISTINGS } from "./api/constants.js";

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");
console.log("Listing ID:", listingId);

if (!listingId) {
  console.error("Listing ID is undefined or not retrieved correctly");
}

function isUserLoggedIn() {
  const token = localStorage.getItem("token");
  return token !== null && token !== "";
}

function showLoginPrompt() {
  alert("You have to log in before you place a bid.");
}

export async function placeBid(listingId, bidAmount) {
  if (!isUserLoggedIn()) {
    showLoginPrompt();
    return;
  }

  const apiUrl = LISTINGS + "/" + listingId + "/bids";
  const token = localStorage.getItem("token");

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount: bidAmount }),
  };

  try {
    const response = await fetch(apiUrl, requestData);
    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const messageElement = document.getElementById("bidMessage");
    messageElement.classList.add = "successMessage";
    messageElement.classList.remove = "errorMessage";
    if (messageElement) {
      messageElement.innerHTML = "<p>Bid placed successfully!</p>";
      const bidAmountInput = document.getElementById("bidAmount");
      if (bidAmountInput) bidAmountInput.value = "";
    }
    console.log("Bid successful:", responseBody);
  } catch (error) {
    console.error("Error placing bid:", error);
    const messageElement = document.getElementById("bidMessage");
    messageElement.classList.add = "errorMessage";
    messageElement.classList.remove = "successMessage";
    if (messageElement) {
      messageElement.innerHTML = `<p>Error placing bid: ${error.message}</p>`;
    }
  }
}

window.onload = function () {
  const bidButton = document.getElementById("bidButton");
  if (bidButton) {
    bidButton.addEventListener("click", function () {
      const bidAmountInput = document.getElementById("bidAmount");
      const bidAmount = bidAmountInput ? bidAmountInput.value : null;

      if (bidAmount) {
        placeBid(listingId, bidAmount);
      } else {
        alert("Please enter a bid amount.");
      }
    });
  } else {
    console.error("Bid button not found");
  }
};
