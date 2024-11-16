// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tournament is ERC721URIStorage, Ownable{
    string[] public tokenUris;
    uint[] public prices;
    address[] public players; 
	address[] public sellers;
    uint[] public tokenId;
    bool public finished = false;
	uint public token_counter;

    constructor() ERC721("TestNFT", "TNFT") Ownable(msg.sender) {
        token_counter = 0;
    }
	event GameStarted(address indexed player1, address indexed player2);

    function register_players(uint id) public payable returns(bool) {
        require(id < tokenUris.length, "Invalid token id");
        require(msg.value == prices[id] * 2, "Incorrect ETH amount");
        if (players.length == 1) {
            require(id == tokenId[0], "Not matching tokens");
            require(msg.sender != players[0], "2 unique users required");
        }
        if (players.length == 2) {
            return false;
        }
        players.push(msg.sender);
        tokenId.push(id);
		payable(sellers[id]).transfer(prices[id]);
		_safeMint(msg.sender, id);
    	_setTokenURI(id, tokenUris[id]);
        if (players.length == 2) {
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
    	payable(winner).transfer(prices[tokenId[0]] * 2);
    }
    function addTokenUriAndPrice(string memory uri, uint price) public {
        tokenUris.push(uri);
        prices.push(price);
		sellers.push(msg.sender);//seller call this ft!
    }
}
