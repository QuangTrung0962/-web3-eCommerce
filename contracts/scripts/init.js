const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function init() {
  const address = "0x9FaC14E1AE11df5dc250846F666D5B390a0aB426";

  await helpers.setBalance(address, 1000 * 1e18);
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
