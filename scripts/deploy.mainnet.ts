import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./mainnet_deployments.json",
	adminWallet: "0xfeE202Cf98C1F47cF23975689880AFD5B8E7073d",
	WETH_ERC20: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
	WETH_ORACLE: "0x6850A6e773b9a625C6810E34070491d0FF97E065",
	WCRO_ERC20: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
	WCRO_ORACLE: "0x4636AC8216805Fe96dE9E7aFc62dA99096a930F6",
	WBTC_ERC20: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
	WBTC_ORACLE: "0xb3DF0a9582361db08EC100bd5d8CB70fa8579f4B",
	UNISWAP_V2_FACTORY: "0x73A48f8f521EB31c55c0e1274dB0898dE599Cb11",
	UNISWAP_V2_ROUTER: "0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918",
	BOC_Treasury: "0xBacF28BF21B374459C738289559EF89978D08102",
}

async function main() {
	const helper = new DeploymentHelper(config)
	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})

