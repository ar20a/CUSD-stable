import { IDeployConfig } from "./config/DeployConfig"
import { Deployer } from "./Deployer"

const config: IDeployConfig = {
	outputFile: 'string',
	adminWallet: 'string',
	WETH_ERC20: 'string',
	UNISWAP_V2_FACTORY: 'string',
	UNISWAP_V2_ROUTER: ' ',
}

async function main() {
	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
