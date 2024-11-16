// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("TestNFT", "TNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI); // This function is available in ERC721URIStorage
        tokenCounter += 1;
        return newTokenId;
    }

}

//string[] memory uris = ["QmW4EQ6pju1BJ96rpvirpsqdCL5XMjJowNndYc1uonDA1Q"];
//uri needs to be mapped to image .... and to a price
contract Tournament {
	bool full;
	address[] players;

	function register_players(string memory token_uri, uint price) returns(boolean){
		//if full create a new instance
		if (players.length == 2)
			return false;
		require(msg.sender.balance >= price, "insufficient balance");
		players.add(msg.sender);
		if (players.length == 2)
			start_game(); // event ? 
	}

	function charge_looser(uint player_index)
	{
		transform_
	}
}