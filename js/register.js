import { REGISTER } from "./api/constants.js";

async function registerUser(userRegisterData) {
  try {
    const registerData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegisterData),
    };

    const response = await fetch(REGISTER, registerData);

    if (response.ok) {
      const data = await response.json();
      alert(
        "Registration is successfull. You will be redirected to the log in page."
      );
      window.location.href = "../user/login.html";
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
}

const form = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const userInput = document.getElementById("user");
const passwordInput = document.getElementById("password");

async function registerNewUser(event) {
  event.preventDefault();

  const user = {
    name: userInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const newUser = await registerUser(user);
  } catch (error) {
    console.log("Something went wrong, please try again.");
  }
}

registerForm.addEventListener("submit", registerNewUser);
