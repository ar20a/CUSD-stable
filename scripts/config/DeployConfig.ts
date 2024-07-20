import { BigNumber } from "ethers"

export interface IDeployConfig {
	outputFile: string
	adminWallet: string
	WETH_ERC20: string
	WETH_ORACLE: string
	WCRO_ERC20: string
	WCRO_ORACLE: string
	WBTC_ERC20: string
	WBTC_ORACLE: string
	UNISWAP_V2_FACTORY: string
	UNISWAP_V2_ROUTER: string
	BOC_Treasury: string
}