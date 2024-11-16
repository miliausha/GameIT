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
//we will map id to images
contract Tournament {
	string[] tokenUris = ["QmW4EQ6pju1BJ96rpvirpsqdCL5XMjJowNndYc1uonDA1Q"];
	uint[] prices = [10000000000000000]; // Represents 0.01 ETH in wei
	bool full;
	address[] players;
	uint[] tokenId;
	function register_players(uint id, uint price)public payable returns(bool) {
		//if full create a new instance
		if (players.length == 1)
			require(id == tokenId[0], "not matching tokens");
		if (players.length == 2)
			return false; // create a new instance 
		require(msg.sender.balance >= price, "insufficient balance");
		require(id >= 0 && id < tokenUris.length, "invalid token id");
		players.push(msg.sender);
		tokenId[players.length] = id;
		if (players.length == 2)
			start_game(); // event ?
		return true; 
	}

	function start_game() internal {
		///...
	}

	function charge_looser(uint index) public
	{

		//send nft to winner
		//charge looser
		//verify transaction
		//send nft to looser
	}
}