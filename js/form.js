import { findHighestBid } from "./api/highestBid.js";

export function renderBiding(target, data) {
  const user = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const credit = localStorage.getItem("credit");
  const highestBid = findHighestBid(data.bids);

  const bidForm = document.createElement("form");
  bidForm.id = "bidForm";

  const bidInput = document.createElement("input");
  bidInput.type = number;
  bidInput.id = "bid";
  bidInput.label = "Bid";

  const submitButton = document.createElement("button");
  submitButton.id = "button";
  submitButton.class = "btn btn-success";

  bidForm.appendChild(bidInput[0]);
  bidForm.appendChild(submitButton);

  target.appendChild(bidForm);
}
