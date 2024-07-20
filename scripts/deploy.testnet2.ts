import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./testnet2_deployments.json",
	adminWallet: "0xb9be147d5493ae3c933e267d07d4a2a9ab9f3e6e",
	WETH_ERC20: "0x0040918e7f2529FdE6631dC104F113Cf84F4891B",
	WETH_ORACLE: "0x194B620325348107E9e5186C0B46ee9094113814",
	WCRO_ERC20: "0x5a6892442172c7a2693dF71E4A77895192ab184c",
	WCRO_ORACLE: "0x490A10C0aF776B4620894793805F3Aa66cEa1474",
	WBTC_ERC20: "0x8C3BD1B6d71E613fb6Cb82638C1e78e7677EeDE5",
	WBTC_ORACLE: "0xBE72E6D82Ab65BcA0C49107EFfe8BF2aE5979cD2",
	UNISWAP_V2_FACTORY: "0xaEfC9747B84EbbdE6c5e34fc853C15526B924068",
	UNISWAP_V2_ROUTER: "0xd99d1c33f9fc3444f8101754abc46c52416550d1",
	BOC_Treasury: "0xb9be147d5493ae3c933e267d07d4a2a9ab9f3e6e",
}

async function main() {
	const helper = new DeploymentHelper(config)
	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})

