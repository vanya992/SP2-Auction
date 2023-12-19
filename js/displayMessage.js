export function displayMessage(input, message, messageType) {
  let messageDisplay = input.nextElementSibling;

  if (
    !messageDisplay ||
    !messageDisplay.classList.contains("message-display")
  ) {
    messageDisplay = document.createElement("div");
    messageDisplay.className = "message-display";
    input.parentNode.insertBefore(messageDisplay, input.nextSibling);
  }

  if (messageType === "error") {
    messageDisplay.classList.add("error-message");
    messageDisplay.classList.remove("success-message");
  } else if (messageType === "success") {
    messageDisplay.classList.add("success-message");
    messageDisplay.classList.remove("error-message");
  }

  messageDisplay.textContent = message;
  messageDisplay.style.display = "block";
}
