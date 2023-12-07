const logOut = document.querySelector("#logOut");
logOut.style.cursor = "pointer";

export function logOutButton() {
  logOut.addEventListener("click", () => {
    window.location.replace("../index.html");
    localStorage.clear();
  });
}
