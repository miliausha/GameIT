// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tournament is ERC721URIStorage, Ownable{
    string[] public tokenUris;
    uint[] public prices;
    address[] public players; 
    uint[] public tokenId;
    bool public finished = false;
    address public winner;
    address public loser;
	uint public token_counter;

    mapping(uint => uint) public tokenPrices;
    constructor() ERC721("TestNFT", "TNFT") Ownable(msg.sender) {
        token_counter = 0;
    }
    function register_players(uint id) public payable returns(bool) {
        require(id < tokenUris.length, "Invalid token id");
        require(msg.value == prices[id], "Incorrect ETH amount");
        if (players.length == 1) {
            require(id != tokenId[0], "Not matching tokens");
            require(msg.sender != players[0], "2 unique users required");
        }
        if (players.length == 2) {
            return false;
        }
        players.push(msg.sender);
        tokenId.push(id);
        if (players.length == 2) {
            start_game();
        }
        return true;
    }
    function mintNFT(uint tokenIndex, address to) internal returns (uint) {
        uint newTokenId = token_counter;
		token_counter++;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenUris[tokenIndex]);
        return newTokenId;
    }
    function start_game() internal {
			//emit event
			//set who is winner
        finished = true;
    }

    function charge_looser(/*or send winner her*/) public {
        require(finished == true, "Game has not finished yet");
        require(msg.sender == winner, "Only the winner can charge the loser");
        payable(winner).transfer(prices[tokenId[1]] * 2);
        clean();
    }

    function clean() internal {
        delete players;
        delete tokenId;
        finished = false;
        winner = address(0);
        loser = address(0);
    }

    // Add URIs and prices
    function addTokenUriAndPrice(string memory uri, uint price) public onlyOwner {
        tokenUris.push(uri);
        prices.push(price);
    }
}
