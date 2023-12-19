import { PROFILE } from "./api/constants.js";

export function fetchAndUpdateUserCredit() {
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
      if (userData && userData.credits !== undefined) {
        localStorage.setItem("credit", userData.credits);
        updateCreditDisplay(userData.credits);
      } else {
        console.error("No credit info found for the user.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user credit:", error);
    });
}

function fetchUpdatedCredit() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  if (!token || !userName) {
    console.error("User is not authenticated.");
    return Promise.reject("User not authenticated");
  }

  return fetch(PROFILE + `/${userName}`, {
    // Assuming PROFILE is your endpoint
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((userData) => {
      if (userData && userData.credits !== undefined) {
        return userData.credits;
      } else {
        throw new Error("Credit data not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching updated credit:", error);
      throw error;
    });
}

function updateCreditDisplay(credit) {
  const userCreditElement = document.getElementById("userCreditDisplay");
  if (userCreditElement) {
    userCreditElement.textContent = `Credit: ${credit}`;
  }
}

export function updateCredit() {
  fetchUpdatedCredit().then((newCredit) => {
    localStorage.setItem("credit", newCredit);
    const userCreditElement = document.getElementById("userCreditDisplay");
    if (userCreditElement) {
      userCreditElement.textContent = `Credit: ${newCredit}`;
    }
  });
}

updateCredit();
