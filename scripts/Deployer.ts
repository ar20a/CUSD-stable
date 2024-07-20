import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { ethers, upgrades } from "hardhat"
import { BigNumber, Contract, Signer } from "ethers"
import { assert } from "chai"

export class Deployer {
	config: IDeployConfig
	helper: DeploymentHelper
    deployerWallet?: Signer

	constructor(config: IDeployConfig) {
		this.config = config
		this.helper = new DeploymentHelper(config)
	}

	async run() {
		await this.helper.initHelper()
        this.deployerWallet = (await ethers.getSigners())[0]
		const Contract = await ethers.getContractFactory("Contract")
		// const contract = await this.helper.deployContract(
		// 	Contract,
		// 	"DefaultContract"
		// )
        await this.deployVestaCore()

		// Testnet -> need to deploy mock collateral (WETH, WBNB etc.) and set approvals etc.
		// Testnet -> need to deploy mock oracle
		//
		
	}


	async deployVestaCore(){

	//
    //

    console.log("Deploying core Vesta Contracts")

    this.deployerWallet = (await ethers.getSigners())[0]
	// Get contract factories
    const PriceFeedFactory = await ethers.getContractFactory("PriceFeed")
    const sortedTrovesFactory = await ethers.getContractFactory("SortedTroves")
    const troveManagerFactory = await ethers.getContractFactory("TroveManager")
    const activePoolFactory = await ethers.getContractFactory("ActivePool")
    const stabilityPoolFactory = await ethers.getContractFactory("StabilityPool")
    const gasPoolFactory = await ethers.getContractFactory("GasPool")
    const defaultPoolFactory = await ethers.getContractFactory("DefaultPool")
    const collSurplusPoolFactory = await ethers.getContractFactory("CollSurplusPool")
    const borrowerOperationsFactory = await ethers.getContractFactory("BorrowerOperations")
    const hintHelpersFactory = await ethers.getContractFactory("HintHelpers")
    const cusdTokenFactory = await ethers.getContractFactory("CUSDToken")
    const troveManagerLiquidationsFactory = await ethers.getContractFactory("TroveManagerLiquidations")
    const troveManagerRedemptionsFactory = await ethers.getContractFactory("TroveManagerRedemptions")
    const whitelistFactory = await ethers.getContractFactory("Whitelist")
    const linearpricecurveFactory = await ethers.getContractFactory("ThreePieceWiseLinearPriceCurve")

	const ethPriceFeed = await this.helper.deployUpgradeableContract(PriceFeedFactory, 'ethPriceFeed')
    const croPriceFeed = await this.helper.deployUpgradeableContract(PriceFeedFactory, 'croPriceFeed')
    const btcPriceFeed = await this.helper.deployUpgradeableContract(PriceFeedFactory, 'btcPriceFeed')
    const sortedTroves = await this.helper.deployUpgradeableContract(sortedTrovesFactory, 'sortedTroves')
    const troveManager = await this.helper.deployUpgradeableContract(troveManagerFactory, 'troveManager')
    const activePool = await this.helper.deployContract(activePoolFactory, 'activePool')
    const stabilityPool = await this.helper.deployContract(stabilityPoolFactory, 'stabilityPool')
    const gasPool = await this.helper.deployContract(gasPoolFactory, 'gasPool')
    const defaultPool = await this.helper.deployContract(defaultPoolFactory, 'defaultPool')
    const collSurplusPool = await this.helper.deployContract(collSurplusPoolFactory, 'collSurplusPool')
    const borrowerOperations = await this.helper.upgradeUpgradeableContract(borrowerOperationsFactory, 'borrowerOperations')
    const hintHelpers = await this.helper.deployUpgradeableContract(hintHelpersFactory, 'hintHelpers')
    const troveManagerLiquidations = await this.helper.deployUpgradeableContract(troveManagerLiquidationsFactory, 'troveManagerLiquidations')
    const troveManagerRedemptions = await this.helper.deployUpgradeableContract(troveManagerRedemptionsFactory, 'troveManagerRedemptions')
    const whitelist = await this.helper.deployUpgradeableContract(whitelistFactory, 'whitelist')

    // console.log('verifying whitelist')
    //     await this.helper.verifyContract(whitelist.address)

    const ethlinearpricecurve = await this.helper.deployUpgradeableContract(linearpricecurveFactory, 'ethlinearpricecurve');
    const crolinearpricecurve = await this.helper.deployUpgradeableContract(linearpricecurveFactory, 'crolinearpricecurve');
    const btclinearpricecurve = await this.helper.deployUpgradeableContract(linearpricecurveFactory, 'btclinearpricecurve');

    const cusdTokenParams = [
      troveManager.address,
      troveManagerLiquidations.address,
      troveManagerRedemptions.address,
      stabilityPool.address,
      borrowerOperations.address,
      this.deployerWallet.getAddress()
    ]
    const cusdToken = await this.helper.deployContract(
      cusdTokenFactory,
      'cusdToken',
      troveManager.address,
      troveManagerLiquidations.address,
      troveManagerRedemptions.address,
      stabilityPool.address,
      borrowerOperations.address
    )



        
    if (!this.helper.deploymentState['ethPriceFeed'].initialized) { await this.helper.sendAndWaitForTransaction(ethPriceFeed.setUp()); this.helper.deploymentState['ethPriceFeed'].initialized = true; this.helper.saveDeployment() }
    if (!this.helper.deploymentState['croPriceFeed'].initialized) { await this.helper.sendAndWaitForTransaction(croPriceFeed.setUp()); this.helper.deploymentState['croPriceFeed'].initialized = true; this.helper.saveDeployment() }
    if (!this.helper.deploymentState['btcPriceFeed'].initialized) { await this.helper.sendAndWaitForTransaction(btcPriceFeed.setUp()); this.helper.deploymentState['btcPriceFeed'].initialized = true; this.helper.saveDeployment() }
    if (!this.helper.deploymentState['sortedTroves'].initialized) { await this.helper.sendAndWaitForTransaction(sortedTroves.setUp()); this.helper.deploymentState['sortedTroves'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['troveManager'].initialized) { await this.helper.sendAndWaitForTransaction(troveManager.setUp()); this.helper.deploymentState['troveManager'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['activePool'].initialized) { await this.helper.sendAndWaitForTransaction(activePool.setUp()); this.helper.deploymentState['activePool'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['stabilityPool'].initialized) { await this.helper.sendAndWaitForTransaction(stabilityPool.setUp()); this.helper.deploymentState['stabilityPool'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['defaultPool'].initialized) { await this.helper.sendAndWaitForTransaction(defaultPool.setUp()); this.helper.deploymentState['defaultPool'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['collSurplusPool'].initialized) { await this.helper.sendAndWaitForTransaction(collSurplusPool.setUp()); this.helper.deploymentState['collSurplusPool'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['hintHelpers'].initialized) { await this.helper.sendAndWaitForTransaction(hintHelpers.setUp()); this.helper.deploymentState['hintHelpers'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['troveManagerLiquidations'].initialized) { await this.helper.sendAndWaitForTransaction(troveManagerLiquidations.setUp()); this.helper.deploymentState['troveManagerLiquidations'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['troveManagerRedemptions'].initialized) { await this.helper.sendAndWaitForTransaction(troveManagerRedemptions.setUp()); this.helper.deploymentState['troveManagerRedemptions'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['whitelist'].initialized) {
        await this.helper.sendAndWaitForTransaction(whitelist.setUp());
        await this.helper.sendAndWaitForTransaction(whitelist.setAddresses(
        activePool.address,
        defaultPool.address,
        stabilityPool.address,
        collSurplusPool.address,
        borrowerOperations.address
      ))
        this.helper.deploymentState['whitelist'].initialized = true;
        this.helper.deploymentState['whitelist'].addressesSet = true
        this.helper.saveDeployment()}
    if (!this.helper.deploymentState['ethlinearpricecurve'].initialized) { await this.helper.sendAndWaitForTransaction(ethlinearpricecurve.setUp()); this.helper.deploymentState['ethlinearpricecurve'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['crolinearpricecurve'].initialized) { await this.helper.sendAndWaitForTransaction(crolinearpricecurve.setUp()); this.helper.deploymentState['crolinearpricecurve'].initialized = true; this.helper.saveDeployment()}
    if (!this.helper.deploymentState['btclinearpricecurve'].initialized) { await this.helper.sendAndWaitForTransaction(btclinearpricecurve.setUp()); this.helper.deploymentState['btclinearpricecurve'].initialized = true; this.helper.saveDeployment()}

     
        
        
        
        
    //Connect Contracts
    console.log("Setting addresses for core Vesta Contracts")


    //Set Price feed address (Oracle needs to be up and working)
    console.log("pricefeed")
    if(!this.helper.deploymentState['ethPriceFeed'].addressesSet){
        await this.helper.sendAndWaitForTransaction(ethPriceFeed.setAddresses(this.config.WETH_ORACLE))
        this.helper.deploymentState['ethPriceFeed'].addressesSet = true
        this.helper.saveDeployment()
    }
    if(!this.helper.deploymentState['croPriceFeed'].addressesSet){
        await this.helper.sendAndWaitForTransaction(croPriceFeed.setAddresses(this.config.WCRO_ORACLE))
        this.helper.deploymentState['croPriceFeed'].addressesSet = true
        this.helper.saveDeployment()
    }
    if(!this.helper.deploymentState['btcPriceFeed'].addressesSet){
        await this.helper.sendAndWaitForTransaction(btcPriceFeed.setAddresses(this.config.WBTC_ORACLE))
        this.helper.deploymentState['btcPriceFeed'].addressesSet = true
        this.helper.saveDeployment()
    }

    // set TroveManager addr in SortedTroves
    console.log("sortedTroves")
    await this.helper.isOwnershipRenounced(sortedTrovesFactory, sortedTroves.address) ||
      await this.helper.sendAndWaitForTransaction(sortedTroves.setParams(
        '0x' + 'f'.repeat(64),
        troveManager.address,
        borrowerOperations.address,
        troveManagerRedemptions.address
	
      ))

    // console.log(await sortedTroves.data())
    // console.log(await this.helper.isOwnershipRenounced(troveManagerFactory,troveManager.address))
    // console.log(await this.helper.isOwnershipRenounced(troveManagerLiquidationsFactory,troveManagerLiquidations.address))
    // console.log(await this.helper.isOwnershipRenounced(troveManagerRedemptionsFactory,troveManagerRedemptions.address))

    console.log("linearpricecurve")
    if(!this.helper.deploymentState['ethlinearpricecurve'].addressesSet) {
        await this.helper.sendAndWaitForTransaction(ethlinearpricecurve.setAddresses(
            whitelist.address
        ))
        this.helper.deploymentState['ethlinearpricecurve'].addressesSet = true
        this.helper.saveDeployment()
    }
    if(!this.helper.deploymentState['crolinearpricecurve'].addressesSet) {
        await this.helper.sendAndWaitForTransaction(crolinearpricecurve.setAddresses(
            whitelist.address
        ))
        this.helper.deploymentState['crolinearpricecurve'].addressesSet = true
        this.helper.saveDeployment()
    }
    if(!this.helper.deploymentState['btclinearpricecurve'].addressesSet) {
        await this.helper.sendAndWaitForTransaction(btclinearpricecurve.setAddresses(
            whitelist.address
        ))
        this.helper.deploymentState['btclinearpricecurve'].addressesSet = true
        this.helper.saveDeployment()
    }

    // set contracts in the Trove Manager
    console.log("troveManager")
    await this.helper.isOwnershipRenounced(troveManagerFactory,troveManager.address) ||
      await this.helper.sendAndWaitForTransaction(troveManager.setAddresses(
        borrowerOperations.address,
        activePool.address,
        defaultPool.address,
        stabilityPool.address,
        gasPool.address,
        collSurplusPool.address,
        cusdToken.address,
        sortedTroves.address,
        this.config.BOC_Treasury,
        whitelist.address,
        troveManagerRedemptions.address,
        troveManagerLiquidations.address
	
      ))

    // set contracts in the Trove Manager Liquidations
    console.log("troveManagerLiquidations")
    await this.helper.isOwnershipRenounced(troveManagerLiquidationsFactory,troveManagerLiquidations.address) ||
    await this.helper.sendAndWaitForTransaction(troveManagerLiquidations.setAddresses(
      borrowerOperations.address,
      activePool.address,
      defaultPool.address,
      stabilityPool.address,
      gasPool.address,
      collSurplusPool.address,
      cusdToken.address,
      sortedTroves.address,
      this.config.BOC_Treasury,
      whitelist.address,
      troveManager.address,
      '0x1087234fe877721F30016ebeD5BEd061397C8851',
    ))

    console.log("troveManagerRedemptions")
    await this.helper.isOwnershipRenounced(troveManagerRedemptionsFactory,troveManagerRedemptions.address) ||
    await this.helper.sendAndWaitForTransaction(troveManagerRedemptions.setAddresses(
      borrowerOperations.address,
      activePool.address,
      defaultPool.address,
      stabilityPool.address,
      gasPool.address,
      collSurplusPool.address,
      cusdToken.address,
      sortedTroves.address,
      this.config.BOC_Treasury,
      whitelist.address,
      troveManager.address
      
    ))



    console.log("borrowerOperations")
    // set contracts in BorrowerOperations

    if(!this.helper.deploymentState['borrowerOperations'].addressesSet) {
        await this.helper.sendAndWaitForTransaction(borrowerOperations.setAddresses(
            troveManager.address,
            activePool.address,
            defaultPool.address,
            stabilityPool.address,
            gasPool.address,
            collSurplusPool.address,
            sortedTroves.address,
            cusdToken.address,
            this.config.BOC_Treasury,
            whitelist.address
        ))
        this.helper.deploymentState['borrowerOperations'].addressesSet = true
        this.helper.saveDeployment()
    }

    console.log("stabilityPool")
    // set contracts in the Pools
    await this.helper.isOwnershipRenounced(stabilityPoolFactory,stabilityPool.address) ||
      await this.helper.sendAndWaitForTransaction(stabilityPool.setAddresses(
        borrowerOperations.address,
        troveManager.address,
        activePool.address,
        cusdToken.address,
        sortedTroves.address,
        whitelist.address,
        troveManagerLiquidations.address
	
      ))

    console.log("activePool")
    await this.helper.isOwnershipRenounced(activePoolFactory,activePool.address) ||
      await this.helper.sendAndWaitForTransaction(activePool.setAddresses(
        borrowerOperations.address,
        troveManager.address,
        stabilityPool.address,
        defaultPool.address,
        whitelist.address,
        troveManagerLiquidations.address,
        troveManagerRedemptions.address,
        collSurplusPool.address
	
      ))


    console.log("defaultPool")
    await this.helper.isOwnershipRenounced(defaultPoolFactory,defaultPool.address) ||
      await this.helper.sendAndWaitForTransaction(defaultPool.setAddresses(
        troveManager.address,
        activePool.address,
        whitelist.address,
        this.config.BOC_Treasury
	
      ))

    console.log("collSurplusPool")
    await this.helper.isOwnershipRenounced(collSurplusPoolFactory,collSurplusPool.address) ||
      await this.helper.sendAndWaitForTransaction(collSurplusPool.setAddresses(
        borrowerOperations.address,
        troveManager.address,
        troveManagerRedemptions.address,
        activePool.address,
        whitelist.address
	
      ))

    console.log("hintHelpers ...  " + this.helper.deploymentState['hintHelpers'].addressesSet)
    // set contracts in HintHelpers
    if(!this.helper.deploymentState['hintHelpers'].addressesSet) {
        console.log("wtf .." + this.helper.deploymentState['hintHelpers'].addressesSet)
        await this.helper.sendAndWaitForTransaction(hintHelpers.setAddresses(
        sortedTroves.address,
        troveManager.address,
        whitelist.address

      ))
        this.helper.deploymentState['hintHelpers'].addressesSet = true
        this.helper.saveDeployment()
    }


      if(!this.helper.deploymentState['whitelist'].addressesSet){
      await this.helper.sendAndWaitForTransaction(whitelist.setAddresses(
        activePool.address,
        defaultPool.address,
        stabilityPool.address,
        collSurplusPool.address,
        borrowerOperations.address
      ));
        this.helper.deploymentState['whitelist'].addressesSet = true
        this.helper.saveDeployment()
    }
        

    //add collaterals to whitelist
    console.log("Adding WETH collateral to whitelist, address: " + this.config.WETH_ERC20);
    console.log("Adding WCRO collateral to whitelist, address: " + this.config.WCRO_ERC20);
    console.log("Adding WBTC collateral to whitelist, address: " + this.config.WBTC_ERC20);

    console.log("ethPriceFeed " + ethPriceFeed.address);
    console.log("ethlinearpricecurve " + ethlinearpricecurve.address);
    console.log("UNISWAP_V2_ROUTER " + this.config.UNISWAP_V2_ROUTER);

    console.log("WETH: adding collateral");
    // await this.helper.sendAndWaitForTransaction(whitelist.addCollateral(this.config.WETH_ERC20, "1000000000000000000", "1000000000000000000", ethPriceFeed.address, 18, ethlinearpricecurve.address, false, this.config.UNISWAP_V2_ROUTER));
    // this.helper.deploymentState['WETH'].collateralAdded = true; this.helper.saveDeployment();
    console.log("WETH: setting params");
    await this.helper.sendAndWaitForTransaction(ethlinearpricecurve.adjustParams('WETH', "5000000000000000", "1000000000000000", "10000000000000000", "800000000000000000", "40000000000000000", "900000000000000000", "29999999999999999711431884800","432000"));
    this.helper.deploymentState['WETH'].parametersSet = true; this.helper.saveDeployment();

    console.log("WCRO: adding collateral");
    await this.helper.sendAndWaitForTransaction(whitelist.addCollateral(this.config.WCRO_ERC20, "1000000000000000000", "1000000000000000000", croPriceFeed.address, 18, crolinearpricecurve.address, false, this.config.UNISWAP_V2_ROUTER));
    this.helper.deploymentState['WCRO'].collateralAdded = true; this.helper.saveDeployment();
    console.log("WCRO: setting params");
    await this.helper.sendAndWaitForTransaction(crolinearpricecurve.adjustParams('WCRO', "5000000000000000", "1000000000000000", "10000000000000000", "800000000000000000", "40000000000000000", "900000000000000000", "29999999999999999711431884800","432000"));
    this.helper.deploymentState['WCRO'].parametersSet = true; this.helper.saveDeployment();

    console.log("WBTC: adding collateral");
    await this.helper.sendAndWaitForTransaction(whitelist.addCollateral(this.config.WBTC_ERC20, "1000000000000000000", "1000000000000000000", btcPriceFeed.address, 18, btclinearpricecurve.address, false, this.config.UNISWAP_V2_ROUTER));
    this.helper.deploymentState['WBTC'].collateralAdded = true; this.helper.saveDeployment();
    console.log("WBTC: setting params");
    await this.helper.sendAndWaitForTransaction(btclinearpricecurve.adjustParams('WBTC', "5000000000000000", "1000000000000000", "10000000000000000", "800000000000000000", "40000000000000000", "900000000000000000", "29999999999999999711431884800","432000"));
    this.helper.deploymentState['WBTC'].parametersSet = true; this.helper.saveDeployment();
	}
}
