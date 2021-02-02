const hre = require("hardhat");

async function main() {
  const now     = Date.now()
  const start   = (now)
  const cliff   = (now + 10)
  const vesting = (now + 120)
  const revoke  =  true

  const tokenManager = "0x8d47Bf4caff4f86A2a60679e063A3F2637464518"
  const agent = "0x16931b6faef3f2336ab902a3c24629b338dc5ea4"

  const BatchVest = await hre.ethers.getContractFactory("BatchVest");
  const batchVest = await BatchVest.deploy(start, cliff, vesting, revoke, tokenManager);

  await batchVest.deployed();

  console.log("batchVest deployed to:", batchVest.address);

  await batchVest.vest()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
