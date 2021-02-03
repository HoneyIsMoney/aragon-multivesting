// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;
import "./ITokenManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BatchVest
 * @dev batch vesting calls to tokenManager
 */
contract BatchVest is Ownable {
    ITokenManager tokenManager;

    constructor(address _tokenManager) {
        tokenManager = ITokenManager(_tokenManager);
    }

    function vest(
        address[] memory to,
        uint256[] memory amount,
        uint64 start,
        uint64 cliff,
        uint64 vested,
        bool revokable
    ) external onlyOwner() {
        for (uint8 i = 0; i < to.length; i++) {
            tokenManager.assignVested(
                to[i],
                amount[i],
                start,
                cliff,
                vested,
                revokable
            );
        }
    }
}
