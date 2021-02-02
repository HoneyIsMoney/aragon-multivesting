// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;
import "./ITokenManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BatchVest
 * @dev batch vesting calls to tokenManager
 */
contract BatchVest is Ownable {

    uint64 start;
    uint64 cliff;
    uint64 vested;
    bool revokable;
    uint8 send;
    ITokenManager tokenManager;
    
    address[5] list = [
        0x6850CFeB3e500dE4d9FA13EBD55779c4F1C02101,
        0x99691618eD6cf96d6eF42e2493055fdbD3AA1ed8,
        0xEa181249a7314F194256d93B5B09fE3C4535e295,
        0xDD7f94A7Ac8970fa3777441914e3E96262C9B41e,
        0x94903F4F2a938f6280da444FC8daFC3589959650
    ];
    
    uint256[5] amount = [
        1000000000000000000000,
        1000000000000000000000,
        1000000000000000000000,
        1000000000000000000000,
        1000000000000000000000
    ];

    constructor(        
        uint64 _start,
        uint64 _cliff,
        uint64 _vested,
        bool _revokable,
        address _tokenManager
        )  {
            start = _start;
            cliff = _cliff;
            vested = _vested;
            revokable = _revokable;
            tokenManager = ITokenManager(_tokenManager);
    }
    
    /**
     * @dev batchVest value in variable
     */
    function vest() external onlyOwner() {
        for(uint8 i = 0; i < 5; i++){
            tokenManager.assignVested(list[send], amount[send], start, cliff, vested, revokable);
            send++;
        }
    }
}