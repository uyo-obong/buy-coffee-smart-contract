import { ethers } from 'hardhat';

async function main() {
    // Get contract and deploy it
    const BuyMeACoffee = await ethers.getContractFactory('BuyMeACoffee');
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log('Contract has been deployed to: ', buyMeACoffee.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
