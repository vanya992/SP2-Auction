document.addEventListener("DOMContentLoaded", function () {
  updateLoginLogoutLinks();
});

function updateLoginLogoutLinks() {
  const isLoggedIn = checkLoginState();
  const logInLink = document.getElementById("logIn");
  const logOutLink = document.getElementById("logOut");
  const registerLink = document.getElementById("register");
  const createListing = document.getElementById("createListing");
  const profile = document.getElementById("profile");

  if (isLoggedIn) {
    logInLink.classList.add("d-none");
    registerLink.classList.add("d-none");
    createListing.classList.remove("d-none");
    profile.classList.remove("d-none");
    logOutLink.classList.remove("d-none");
  } else {
    logInLink.classList.remove("d-none");
    registerLink.classList.remove("d-none");
    createListing.classList.add("d-none");
    profile.classList.add("d-none");
    logOutLink.classList.add("d-none");
  }
}

function checkLoginState() {
  const token = localStorage.getItem("token");
  return token != null;
}
