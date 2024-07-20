import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./testnet_deployments.json",
	adminWallet: "0xb9be147d5493ae3c933e267d07d4a2a9ab9f3e6e",
	WETH_ERC20: "0x0a24b20912597cAd8a66Bc71EE71ddd86a9722fD",
	WETH_ORACLE: "0x9b301259FB122A4a5B99391a6040f30B4cc718Ff",
	WCRO_ERC20: "0x0040918e7f2529FdE6631dC104F113Cf84F4891B",
	WCRO_ORACLE: "0x2a7bf4493969A0D3a620a65546a56a2E382A6d5D",
	WBTC_ERC20: "0x63356929a8F7B8833AF721dE71D4d9c583a9EB85",
	WBTC_ORACLE: "0xe0E05D227320B2849F2377ADeA050343cDEC3074",
	UNISWAP_V2_FACTORY: "0xaEfC9747B84EbbdE6c5e34fc853C15526B924068",
	UNISWAP_V2_ROUTER: "0xaEfC9747B84EbbdE6c5e34fc853C15526B924068",
	BOC_Treasury: "0xaEfC9747B84EbbdE6c5e34fc853C15526B924068",
}

async function main() {
	const helper = new DeploymentHelper(config)
	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})

