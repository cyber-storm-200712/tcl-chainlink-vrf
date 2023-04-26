import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.5.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.8",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  mocha: {
    timeout: 200000
  },
  networks: {
    polygon: {
      url: "https://matic-mainnet-archive-rpc.bwarelabs.com",
      accounts: ["ef55760cc4a892bb7ce868d6bc4c195206b83995f5be6ce5a85872585eded48d"],
      timeout: 600000
    },
    bscmainnet: {
      url: process.env.BSC_URL || "",
      accounts:
        ['1aed5614bb8b80e164fe86b5c5f50b6a61440e9b4e3a39250629573069200819'],
      timeout: 600000
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bsctest: {
      url: process.env.BSCTEST_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      timeout: 60000
    },
    snowtrace: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,      // Rinkeby's id
      accounts: ['90b888ae264e10c0e6ae31de9c5790d0afa70b1fa989baeb21beab213acb80e7']
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/60d0fc034847460da68aa4501df5fe57',
      chainId: 5,
      accounts: ['0x07c450de52df478d9e77450857598020bcaf0e3db5919fe2037d1bb3c313c1a8']
    },
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      chainId: 80001,
      accounts: ['0x07c450de52df478d9e77450857598020bcaf0e3db5919fe2037d1bb3c313c1a8']
    },
    localnode: {
      url: process.env.LOCALNET_URL || "http://127.0.0.1:8545",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
        "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
        "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba",
        "0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e",
        "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356",
        "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97"
      ],
      blockGasLimit: 0x1fffffffffffff
    }
  },
  etherscan: {
    // apiKey: 'PM3U6R7RBSE8I23SDYPHHQTIUZG3DJNCY5', //BSC Scan
    // apiKey: '1FTHWYZGTW9TKZA72FTFDBY13UUIRP3SMI' //Ether Scan,
    // apiKey: 'U9J2VP8EWVU1MW1NAUP8M1DYBNF7B7D3K8' //snowtrace,
    apiKey: 'J1HKBETU688PWJE367UZ6NREUYW45ASZ9D' // Mumbai
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : true,
    currency: "USD",
  },
};

export default config;
