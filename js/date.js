function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function updateListingEndTime(endtime) {
  const time = getTimeRemaining(endtime);

  if (time.total <= 0) {
    return "Listing has ended";
  }

  return `${time.days} days, ${time.hours} hours, ${time.minutes} minutes`;
}
