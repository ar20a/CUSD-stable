import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { ethers, upgrades } from "hardhat"
import { BigNumber, Contract, Signer } from "ethers"
import { assert } from "chai"



async function main() {
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

    const helper = new DeploymentHelper(config)
    const deployerWallet = (await ethers.getSigners())[0]
    console.log("timestamp")
    const blocknum = await ethers.provider.getBlockNumber();
    const timestamp = (await ethers.provider.getBlock(blocknum)).timestamp;
    console.log("blocknum: " + blocknum)
    const roundid = 173303594063918;
    console.log(timestamp)

    // //Deploy mock WETH and mint for testing
    const ERC20Token = await ethers.getContractFactory("ERC20Token")
    // const weth = await helper.deployContract(ERC20Token,'WETH',"WETH", "Wrapped Ethereum", 18)
    // await weth.mint(deployerWallet.address, '10000000000000000000000')
    // console.log("Vesta Mock WETH deployed and minted. Address: " + weth.address)
    //
    // //Deploy mock Oracle and initialize prices for future validations of working status
    // const vestaOracleFactory = await ethers.getContractFactory("VestaOracle")
    // const vestaEthOracle = await helper.deployContract(vestaOracleFactory, 'VestaETHOracle', 8,'ETH/USD ORACLE')
    // console.log("Vesta Mock ETH Oracle deployed. Address: " + vestaEthOracle.address)
    // await vestaEthOracle.updatePrice(roundid, timestamp, 122211169367 )
    // //**Optional** Set up mock uniswap factory/router
    //
    // //Deploy mock WCRO and mint for testing
    const wcro = await helper.deployContract(ERC20Token,'WCRO',"WCRO", "Wrapped Cronos", 18)
    // await wcro.mint(deployerWallet.address, '10000000000000000000000')
    // console.log("Vesta Mock CRO deployed and minted. Address: " + wcro.address)
    //
    // //Deploy mock Oracle and initialize prices for future validations of working status
    // const vestaCroOracle = await helper.deployContract(vestaOracleFactory, 'VestaCROOracle', 8,'CRO/USD ORACLE')
    // console.log("Vesta Mock CRO Oracle deployed. Address: " + vestaCroOracle.address)
    // await vestaCroOracle.updatePrice(roundid, timestamp, 11169367 )
    //
    // //Deploy mock WBTC and mint for testing
    // const wbtc = await helper.deployContract(ERC20Token,'WBTC',"WBTC", "Wrapped Ethereum", 18)
    // await wbtc.mint(deployerWallet.address, '10000000000000000000000')
    // console.log("Vesta Mock CRO deployed and minted. Address: " + wbtc.address)
    //
    // //Deploy mock Oracle and initialize prices for future validations of working status
    // const vestaBtcOracle = await helper.deployContract(vestaOracleFactory, 'VestaBTCOracle', 8,'BTC/USD ORACLE')
    // console.log("Vesta Mock CRO Oracle deployed. Address: " + vestaBtcOracle.address)
    // await vestaBtcOracle.updatePrice(roundid, timestamp, 2122211169367 )
    //
    //

    const BorrowerOperations = await ethers.getContractFactory('BorrowerOperations');
    const borrowerOps = BorrowerOperations.attach("0x2769f8aE095773d39fef753f1ccaB5C843357E92");

    const troveManagerFactory = await ethers.getContractFactory('TroveManager');
    const troveManager = troveManagerFactory.attach("0x0a48aDD8F9322Ff17233d2cd1313eEf06DD11beE");

    const cusdTokenFactory = await ethers.getContractFactory("CUSDToken");
    const cusdToken  = await cusdTokenFactory.attach("0x469377677eb1Da5f1Ad4e21F17Af635600bee6CC");

    await wcro.approve(borrowerOps.address, '300000000000000000000000000');

    console.log("Open trove with wcro")
    // await borrowerOps.openTrove('1000000000000000000','3000000000000000000000','0x0000000000000000000000000000000000000000',
    //     '0x0000000000000000000000000000000000000000',[config.WCRO_ERC20],['300000000000000000000000000']);

    const deployerTrovedebt = await troveManager.getTroveDebt(deployerWallet.address);
    const deployerTrovecoll = await troveManager.getTroveColls(deployerWallet.address);
    const deployerTrovestake = await troveManager.getTroveStake(deployerWallet.address, config.WCRO_ERC20);
    const deployerTrovestatus = await troveManager.getTroveStatus(deployerWallet.address);
    console.log('deployer debt: ' + deployerTrovedebt);
    console.log('deployer coll: ' + deployerTrovecoll);
    console.log('deployer stake: ' + deployerTrovestake);
    console.log(`deployer's trove status: ${deployerTrovestatus}`);

    // Check deployer has YUSD
    const deployerYUSDBal = await cusdToken.balanceOf(deployerWallet.address);
    console.log("deployer's YUSD balance: " +  deployerYUSDBal);

}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})

