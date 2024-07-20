import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { ethers, upgrades } from "hardhat"
import { BigNumber, Contract, Signer } from "ethers"
import { assert } from "chai"



async function main() {
    const config: IDeployConfig = {
        outputFile: "./testnet_setup.json",
        adminWallet: "0xfeE202Cf98C1F47cF23975689880AFD5B8E7073d",
        WETH_ERC20: "0x0a24b20912597cAd8a66Bc71EE71ddd86a9722fD",
        WETH_ORACLE: "0x9b301259FB122A4a5B99391a6040f30B4cc718Ff",
        WCRO_ERC20: "0x0040918e7f2529FdE6631dC104F113Cf84F4891B",
        WCRO_ORACLE: "0x2a7bf4493969A0D3a620a65546a56a2E382A6d5D",
        WBTC_ERC20: "0x63356929a8F7B8833AF721dE71D4d9c583a9EB85",
        WBTC_ORACLE: "0xe0E05D227320B2849F2377ADeA050343cDEC3074",
        UNISWAP_V2_FACTORY: "0x67d269191c92Caf3cD7723F116c85e6E9bf55933",
        UNISWAP_V2_ROUTER: "0x67d269191c92Caf3cD7723F116c85e6E9bf55933",
        BOC_Treasury: "0xaEfC9747B84EbbdE6c5e34fc853C15526B924068",
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
    const weth = await helper.deployContract(ERC20Token,'WETH',"WETH", "Wrapped Ethereum", 18)
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
    const wbtc = await helper.deployContract(ERC20Token,'WBTC',"WBTC", "Wrapped Ethereum", 18)
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
    const borrowerOps = BorrowerOperations.attach("0xd35Cd8E6f957f0665735DA69b7bA65Bf1CA17F4c");

    const stabilityPoolFactory = await ethers.getContractFactory("StabilityPool");
    const stabilityPool = await helper.deployContract(stabilityPoolFactory, 'stabilityPool')

    await wcro.approve(borrowerOps.address, '300000000000000000000000000');
    await weth.approve(borrowerOps.address, '300000000000000000000000000');
    await wbtc.approve(borrowerOps.address, '300000000000000000000000000');
    const troveManagerFactory = await ethers.getContractFactory('TroveManager');
    const troveManager = troveManagerFactory.attach("0xe25F864CAB50C8D2738ff65Ba1F8bfc2D49d300E");

    const cusdTokenFactory = await ethers.getContractFactory("CUSDToken");
    const cusdToken  = await cusdTokenFactory.attach("0x7f6544AF79c6Db608aFe8fcf4F251e9DfA7c0c17");

    console.log("Open trove with wcro")
    // await borrowerOps.openTrove('1000000000000000000','3000000000000000000000','0x0000000000000000000000000000000000000000',
    //     '0x0000000000000000000000000000000000000000',[config.WCRO_ERC20],['300000000000000000000000000']);
    await borrowerOps.adjustTrove([config.WBTC_ERC20],['3000000000000000000001'],[],[],'3000000000000000000000',
        true, '0x0000000000000000000000000000000000000000','0x0000000000000000000000000000000000000000','1000000000000000000');
     await borrowerOps.adjustTrove([config.WETH_ERC20],['3000000000000000000001'],[],[],'3000000000000000000000',
        true, '0x0000000000000000000000000000000000000000','0x0000000000000000000000000000000000000000','1000000000000000000');


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

    await stabilityPool.provideToSP('2000000000000000000000')


}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})

