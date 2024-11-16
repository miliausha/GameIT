// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tournament is ERC721URIStorage, Ownable{
    string[] public tokenUris;
    uint[] public prices;
	address[] public sellers;
    address[] public players; 
    uint[] public nftReferences;
    bool public finished = false;
	uint public token_counter;

    constructor() ERC721("TestNFT", "TNFT") Ownable(msg.sender) {
        token_counter = 0;
    }
	event GameStarted(address indexed player1, address indexed player2);
    event PlayerRegistered(address indexed player, uint tokenId, bool isNewGame);

    function register_players(uint nftReferenceId, uint uniqueNftownershipId) public payable returns(bool) {
        require(nftReferenceId < tokenUris.length, "Invalid token id");
        require(msg.value == prices[nftReferenceId] * 2, "Incorrect ETH amount");
        if (players.length == 1) {
            require(nftReferenceId == nftReferences[0], "Not matching tokens");
            require(msg.sender != players[0], "2 unique users required");
        }
        if (players.length == 2) {
            return false;
        }
        players.push(msg.sender);
        nftReferences.push(nftReferenceId);
		payable(sellers[nftReferenceId]).transfer(prices[nftReferenceId]);
		_safeMint(msg.sender, uniqueNftownershipId);
    	_setTokenURI(uniqueNftownershipId, tokenUris[nftReferenceId]);
        if (players.length == 1)
            emit PlayerRegistered(msg.sender, uniqueNftownershipId, true);
        else 
        {
            emit PlayerRegistered(msg.sender, uniqueNftownershipId, false);
            start_game();
        }
        return true;
    }
	function start_game() internal {
    	require(players.length == 2, "Need exactly two players");
    	emit GameStarted(players[0], players[1]);
	}
    function refund_winner(address winner, address loser) public payable {
    	require(msg.sender == loser || msg.sender ==  winner, "You are not a player");
    	payable(winner).transfer(prices[nftReferences[0]] * 2);
    }
    function addTokenUriAndPrice(string memory uri, uint price) public {
        tokenUris.push(uri);
        prices.push(price);
		sellers.push(msg.sender);//seller call this ft!
    }
}
