const hre = require("hardhat");
const date = require("date.js")

async function main() {
  const start   = Math.round(date("now").getTime()/1000)
  const cliff   = Math.round(date('1 minutes from now').getTime()/1000)
  const vesting = Math.round(date("next week").getTime()/1000)
  const revoke  = true

  console.log(`
  start   = ${start}
  cliff   = ${cliff} 
  vesting = ${vesting} 
  `)
  1612258258
  1612258842092


  const tokenManager = "0xAEC5cCf43E481C98FE4975659898083D01682542"
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
