// userProfileDisplay.js

import { updateCredit } from "./userCredit.js";

export function displayUserBasicInfo() {
  const userName = localStorage.getItem("name");
  const userCredit = localStorage.getItem("credit");
  const userAvatar = localStorage.getItem("avatar");
  const userLoggedIn = localStorage.getItem("token");

  const userNameElement = document.getElementById("userNameDisplay");
  const userCreditElement = document.getElementById("userCreditDisplay");
  const userAvatarElement = document.getElementById("userAvatarDisplay");

  if (userLoggedIn && userName && userCredit) {
    userNameElement.textContent = userName;
    userAvatarElement.src = userAvatar;
    userCreditElement.textContent = `Credit: ${userCredit}`;
    userNameElement.style.display = "block";
    userAvatarElement.style.display = "block";
    userCreditElement.style.display = "block";
  } else {
    userNameElement.style.display = "none";
    userAvatarElement.style.display = "none";
    userCreditElement.style.display = "none";
  }
}
updateCredit();

document.addEventListener("DOMContentLoaded", displayUserBasicInfo);
