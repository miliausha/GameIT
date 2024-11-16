// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tournament is ERC721URIStorage, Ownable{

    string[] tokenUris;
    uint[] prices;
	address[] sellers;

	struct CurrentGame {
    	address[] players; 
   		uint[]  nftReferences;
	}
	CurrentGame[]  Games;
	uint public gameId = 0;
	uint public uniqueNftownershipId = 0;

	event GameStarted(
		address indexed player1, 
		address indexed player2
	);//notification to start game...

    event PlayerRegistered(
		address indexed player, 
		uint tokenId, 
		bool isNewGame
	);//for logging info

    event   newTokenAdded(
        string tokenUri,
        uint tokenPrice,
        address indexed tokenSeller
    );//for logging info

    constructor() ERC721("TestNFT", "TNFT") Ownable(msg.sender) {}
	
	/*
	What 		: accepts a player (get deposit = 2x nft price, mint nft for player, pay seller 1x nft price)
	Who  		: player who has bough the nft 
	When 		: when a player buys the nft (this ft has to be called with a message.value of 2x nft price)
	Parameters  : nftReferenceId(id referencing the type of nft they want to buy, so if we have only 2 images to sell this will be either 0 or 1)
	*/
    function register_players(uint nftReferenceId) public payable returns(bool) {
        require(nftReferenceId < tokenUris.length, "Invalid token id");
        require(msg.value == prices[nftReferenceId] * 2, "Incorrect ETH amount");
        if (Games[gameId].players.length == 1) {
            require(nftReferenceId == Games[gameId].nftReferences[0], "Not matching tokens");
            require(msg.sender != Games[gameId].players[0], "2 unique users required");
        }
        if (Games[gameId].players.length == 2) {
            return false;
        }
        Games[gameId].players.push(msg.sender);
        Games[gameId].nftReferences.push(nftReferenceId);
		payable(sellers[nftReferenceId]).transfer(prices[nftReferenceId]);
		_safeMint(msg.sender, uniqueNftownershipId);
    	_setTokenURI(uniqueNftownershipId, tokenUris[nftReferenceId]);
        if (Games[gameId].players.length == 1)
            emit PlayerRegistered(msg.sender, uniqueNftownershipId, true);
        else 
        {
            emit PlayerRegistered(msg.sender, uniqueNftownershipId, false);
            start_game();
        }
		uniqueNftownershipId++;
        return true;
    }

	function start_game() internal {
    	require(Games[gameId].players.length == 2, "Need exactly two players");
    	emit GameStarted(Games[gameId].players[0], Games[gameId].players[1]);
	}

	/*
	Who  		: either player
	When 		: after game is finished
	Parameters  : address of winner and looser, alternatively some index if we keep track of who registered first
	*/
    function refund_winner(address winner, address loser) public payable {
    	require(msg.sender == loser || msg.sender ==  winner, "You are not a player");
    	payable(winner).transfer(prices[Games[gameId].nftReferences[0]] * 2);
		gameId++;
    }

	/*
	What 		: adds nft uri and price to blockchain
	Who  		: the seller calls this ft
	When 		: when the seller uploads an nft to the marketplace
	Parameters  : uri (link of nft ...)
	*/
    function addTokenUriAndPrice(string memory uri, uint price) public {
        tokenUris.push(uri);
        prices.push(price);
		sellers.push(msg.sender);
        emit newTokenAdded(uri, price, msg.sender);
    }
}
