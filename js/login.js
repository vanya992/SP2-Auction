import { LOGIN } from "./api/constants.js";

async function login(profile) {
  const loginUrl = LOGIN;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginUrl, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body,
    });

    if (response.ok) {
      const { accessToken, ...user } = await response.json();
      console.log(user);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("name", user.name);
      localStorage.setItem("profile", JSON.stringify(user));
      window.location.href = "../index.html";
      alert("You are now logged in!");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}
const form = document.getElementById("loginForm");

export function setLogInFormListener() {
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      console.log(profile);

      login(profile);
    });
  }
}

setLogInFormListener();
