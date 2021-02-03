const hre = require("hardhat");
const date = require("date.js");
const web3 = require("web3");
const seed = require("./lists/seedList");
const airdrop = require("./lists/airdropList");
const tokenManager = "0x2a62Bb210B2a84D2e4b96E9649b976b774F40738";

// helpers
const toWei = (num) => web3.utils.toWei(num.toString());

const chunkArray = (myArray, chunk_size) => {
	var results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunk_size));
	}
	return results;
};

const vestAirdrop = async (batchVest) => {
	const start = Math.round(date("now").getTime() / 1000);
	const cliff = Math.round(date("30 days from now").getTime() / 1000);
	const vesting = Math.round(date("90 days from now").getTime() / 1000);
	const tranche = chunkArray(airdrop, 20);

	while (tranche.length > 0) {
		const chunk = tranche.pop();
		await batchVest.vest(
			chunk.map((user) => user[0]),
			chunk.map((user) => toWei(user[1])),
			start,
			cliff,
			vesting,
			true
		);
		console.log(`
vested to ${chunk.length} addresses
batches remaining: ${tranche.length}
`);
	}
};

const vestSeed = async (batchVest) => {
	const start = Math.round(date("now").getTime() / 1000);
	const cliff = Math.round(date("3 months from now").getTime() / 1000);
	const vesting = Math.round(date("1 year from now").getTime() / 1000);

	console.log("Seed Vesting");
	await batchVest.vest(
		seed.map((user) => user[0]),
		seed.map((user) => toWei(user[1])),
		start,
		cliff,
		vesting,
		true
	);
};

async function main() {
	const BatchVest = await hre.ethers.getContractFactory("BatchVest");
	const batchVest = await BatchVest.deploy(tokenManager);
	await batchVest.deployed();
	await tenderly.verify({
        name: "BatchVest",
        address: batchVest.address
	})
	await tenderly.push({
        name: "BatchVest",
        address: batchVest.address
    })
	console.log("batchVest deployed to:", batchVest.address);


  await vestSeed(batchVest);
  await vestAirdrop(batchVest);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
