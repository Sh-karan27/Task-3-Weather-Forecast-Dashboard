export const convertTimestampToDate = (unixTimestamp) => {
  // Create a new Date object using the Unix timestamp (in milliseconds)
  const date = new Date(unixTimestamp * 1000);

  // Convert to a readable date string
  const formattedDate = date.toUTCString().slice(0, 16);

  return formattedDate;
};
