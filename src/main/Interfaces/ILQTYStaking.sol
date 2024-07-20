// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.6.11;

interface ISVSTA {

    // --- Events --
    
    event VSTATokenAddressSet(address _vestaTokenAddress);
    event VSTTokenAddressSet(address _VSTTokenAddress);
    event TroveManagerAddressSet(address _troveManager);
    event TroveManagerRedemptionsAddressSet(address _troveManagerRedemptions);
    event BorrowerOperationsAddressSet(address _borrowerOperationsAddress);
    event ActivePoolAddressSet(address _activePoolAddress);

    event StakeChanged(address indexed staker, uint newStake);
    event StakingGainsWithdrawn(address indexed staker, uint VSTGain);
    event F_VSTUpdated(uint _F_VST);
    event TotalVSTAStakedUpdated(uint _totalVSTAStaked);
    event StakerSnapshotsUpdated(address _staker, uint _F_VST);

    // --- Functions ---

    function setAddresses
    (
        address _vestaTokenAddress,
        address _VSTTokenAddress,
        address _troveManagerAddress, 
        address _troveManagerRedemptionsAddress,
        address _borrowerOperationsAddress,
        address _activePoolAddress
    )  external;

    function stake(uint _VSTAamount) external;

    function unstake(uint _VSTAamount) external;

    function increaseF_VST(uint _VSTAFee) external;

    function getPendingVSTGain(address _user) external view returns (uint);
}
