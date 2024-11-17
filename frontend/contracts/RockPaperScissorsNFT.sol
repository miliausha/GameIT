// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RockPaperScissorsNFT is ERC721URIStorage {
    uint256 public tokenCounter;
    address public owner;

    constructor() ERC721("RPSNFT", "RPS") {
        tokenCounter = 0;
        owner = msg.sender;
    }

    enum Move { Rock, Paper, Scissors }

    struct Game {
        address player1;
        address player2;
        Move player1Move;
        Move player2Move;
        uint256 betAmount;
        bool isCompleted;
        address winner;
    }

    mapping(uint256 => Game) public games;
    uint256 public gameCounter;

    event GameCreated(uint256 gameId, address player1, uint256 betAmount);
    event GameJoined(uint256 gameId, address player2);
    event GameResult(uint256 gameId, address winner);

    function depositNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        _transfer(msg.sender, address(this), tokenId);
    }

    function createGame(Move playerMove) public payable returns (uint256) {
        require(msg.value > 0, "Bet amount must be greater than 0");

        uint256 gameId = gameCounter;
        games[gameId] = Game({
            player1: msg.sender,
            player2: address(0),
            player1Move: playerMove,
            player2Move: Move.Rock, // Placeholder
            betAmount: msg.value,
            isCompleted: false,
            winner: address(0)
        });

        gameCounter++;

        emit GameCreated(gameId, msg.sender, msg.value);
        return gameId;
    }

    function joinGame(uint256 gameId, Move playerMove) public payable {
        Game storage game = games[gameId];

        require(game.player2 == address(0), "Game already has two players");
        require(msg.value == game.betAmount, "Bet amount must match");

        game.player2 = msg.sender;
        game.player2Move = playerMove;

        determineWinner(gameId);
        emit GameJoined(gameId, msg.sender);
    }

    function determineWinner(uint256 gameId) private {
        Game storage game = games[gameId];

        require(game.player2 != address(0), "Second player has not joined yet");
        require(!game.isCompleted, "Game already completed");

        address winner = address(0);

        // Determine winner
        if (
            (game.player1Move == Move.Rock && game.player2Move == Move.Scissors) 
            (game.player1Move == Move.Paper && game.player2Move == Move.Rock) 
            (game.player1Move == Move.Scissors && game.player2Move == Move.Paper)
        ) {
            winner = game.player1;
        } else if (
            (game.player2Move == Move.Rock && game.player1Move == Move.Scissors) 
            (game.player2Move == Move.Paper && game.player1Move == Move.Rock) 
            (game.player2Move == Move.Scissors && game.player1Move == Move.Paper)
        ) {
            winner = game.player2;
        }

        if (winner != address(0)) {
            // Transfer prize to the winner
            payable(winner).transfer(game.betAmount * 2);

            // Transfer NFT
            _transfer(address(this), winner, tokenCounter);
            tokenCounter++;
        }

        game.winner = winner;
        game.isCompleted = true;

        emit GameResult(gameId, winner);
    }

    function getGameDetails(uint256 gameId) public view returns (Game memory) {
        return games[gameId];
    }
}
