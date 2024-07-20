// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import { DSTest } from "ds-test/test.sol";
import { console } from "../utils/console.sol";

contract BaseTest is DSTest {
	function set() public{}

	function testExample() public{
		assertTrue(true);
	}
}
