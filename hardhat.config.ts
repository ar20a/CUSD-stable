import { HardhatUserConfig, subtask } from "hardhat/config"
import deployer from './.secrets'
import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from "hardhat/builtin-tasks/task-names"

import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "@openzeppelin/hardhat-upgrades"

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(
	async (_, __, runSuper) => {
		const paths = await runSuper()
		return paths.filter(
			(p: string) => !p.endsWith(".t.sol") || p.includes("/mock/")
		)
	}
)

const config: HardhatUserConfig = {
	defaultNetwork: "localhost",
	networks: {
		localhost: {
			url: "http://localhost:8545",
		},
		rinkeby: {
			url: deployer.rinkeby_rpc,
			accounts: [deployer.rinkeby_private_key],
		},
		bsctestnet: {
			url: deployer.bsctestnet_rpc,
			accounts: [deployer.bsctestnet_private_key],
			chainId: 97,
      		httpHeaders: { "x-api-key": '' },
		},
		mainnet: {
			url: deployer.mainnet_rpc,
			accounts: [deployer.mainnet_private_key],
			chainId: 25,
      		httpHeaders: { "x-api-key": '' },
		},
		cronostestnet: {
			url: deployer.cronostestnet_rpc,
			accounts: [deployer.cronostestnet_private_key],
			chainId: 338,
		},
	},
	etherscan: {
        apiKey: { bsctestnet: '',
			cronostestnet: '',
			mainnet: ''
        },
        customChains: [
            {
              network: "mainnet",
              chainId: 25,
              urls: {
                apiURL: "https://api.cronoscan.com/api",
                browserURL: "https://cronoscan.com/"
              }
            },
        	{
              network: "bsctestnet",
              chainId: 97,
              urls: {
                apiURL: "https://api-testnet.bscscan.com/api",
                browserURL: "https://testnet.bscscan.com/"
              }
            },
			{
			  network: "cronostestnet",
              chainId: 338,
              urls: {
                apiURL: "https://api-testnet.cronoscan.com/api",
                browserURL: "https://testnet.cronoscan.com/"
              }
			}
          ]
    },
	solidity: {
		compilers: [
			{
				version: "0.6.12",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100
					}
				}
			},
			{
				version: "0.6.11",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100
					}
				}
			},
			{
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 2**32 - 1
                    }
                }
            },
			{
				version: "0.8.10",
				settings: {
				  optimizer: {
					enabled: true,
					runs: 200
				  }
				}
			  },
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 2**32 - 1
                    }
                }
            }
		]
	},

	paths: {
		sources: "./src",
		tests: "./test",
		cache: "./hardhat/cache",
		artifacts: "./hardhat/artifacts",
	},
}

export default config
