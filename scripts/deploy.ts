import { ethers } from 'hardhat';

async function getBalance(address: string) {
    const balance = await ethers.provider.getBalance(address);
    return ethers.utils.formatEther(balance);
}

async function printBalances(addresses: string[]) {
    let idx = 0;
    for (const address of addresses) {
        console.log(`Address ${idx} balance: `, await getBalance(address));
        idx++;
    }
}

async function printGifted(gifts: any) {
    for (const gift of gifts) {
        const timestamp = gift.timestamp;
        const sender = gift.name;
        const senderAddress = gift.from;
        const message = gift.message;

        console.log(
            `At ${timestamp}, ${sender} (${senderAddress}) said: "${message}"`,
        );
    }
}

async function main() {
    const [owner, sender, sender2, sender3] = await ethers.getSigners();

    // Get contract and deploy it
    const BuyMeACoffee = await ethers.getContractFactory('BuyMeACoffee');
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log('Contract has been deployed to: ', buyMeACoffee.address);

    // Get balances
    const addresses = [owner.address, sender.address, buyMeACoffee.address];
    console.log('== START ==');
    await printBalances(addresses);

    // Buy coffee
    const amount = { value: ethers.utils.parseEther('4') };
    await buyMeACoffee
        .connect(sender)
        .buyCoffee('James', 'Yeah, this make sense', amount);

    // Check balance after
    console.log('== BUY COFFEE ==');
    await printBalances(addresses);

    // Withdraw the money to your wallet
    await buyMeACoffee.connect(owner).withdrawGiftedMoney();

    // Check balance after withdrawal
    console.log('== WITHDRAW ==');
    await printBalances(addresses);

    console.log('== DISPLAY GIFTED ADDRESS ==');
    const gifts = await buyMeACoffee.fetchGiftedSent();
    await printGifted(gifts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
