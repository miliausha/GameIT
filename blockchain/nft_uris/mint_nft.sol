// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//string[] memory uris = ["QmW4EQ6pju1BJ96rpvirpsqdCL5XMjJowNndYc1uonDA1Q"];
//uri needs to be mapped to image .... and to a price
//we will map id to images
contract Tournament {
	string[] tokenUris = ["QmW4EQ6pju1BJ96rpvirpsqdCL5XMjJowNndYc1uonDA1Q"];
	uint public test;
	uint public test2;
	uint[] prices = [100]; // Represents 0.01 ETH in wei

	address[] players;
	uint[] tokenId;
    bool finished = false;
	function register_players(uint id)public payable returns(bool) {
		if (players.length == 1)
        {
			require(id == tokenId[0], "not matching tokens");
            require(msg.sender != players[0], "2 unique users required");
        }
		if (players.length == 2)
			return false; // create a new instance 
       require(id < tokenUris.length && id >= 0, "invalid token id");
		require(msg.sender.balance <= prices[id], "insufficient balance");
		players.push(msg.sender);
		tokenId.push(id);
		if (players.length == 2)
			start_game(); // event ?
        finished = true;
		return true; 
	}

	function start_game() internal {
		///...
	}

	// function charge_looser(uint index) public
	// {
    //     require(finished == true,  "game has not finished yet");

	// 	//send nft to winner
	// 	//charge looser
	// 	//verify transaction
	// 	//send nft to looser

	// }
}