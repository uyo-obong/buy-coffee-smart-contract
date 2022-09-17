import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

const GOERLI_URL = process.env.GOERLI_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

const config = {
    solidity: '0.8.17',

    networks: {
        goerli: {
            url: GOERLI_URL,
            accounts: [GOERLI_PRIVATE_KEY],
        },
    },
};

export default config;
