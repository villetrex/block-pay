// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tdx is ERC20 {
    constructor(uint256 initialSupply) ERC220("TdxToken", "Tdx") {
        _mint(msg.sender, initialSupply);
    }
}
