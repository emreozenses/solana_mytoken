import bs58 from "bs58"

const kp = bs58.decode(
  '3xPCV2PmNN6wBUss2D873HbupuD2xWpksV2aaj7Cj1jnHWCYkL8ETDj1RcH7JstqSivy6XrJkCb4nN8oyszSNSho'
);

console.log("my secret key: " + kp);

