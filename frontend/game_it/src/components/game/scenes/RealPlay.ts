import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

interface GameData {
    playerChoice: string;
    timeExpired: boolean;
}
export class RealPlay extends Scene {
    private playerChoice!: string;
    private timeExpired!: boolean;
    private aiChoice!: string;
    private gameResult!: string;
    private possibleChoices: string[] = ['rock', 'paper', 'scissors'];

    constructor() {
        super('RealPlay');
    }
    init(data: GameData) {
        this.playerChoice = data.playerChoice;
        this.timeExpired = data.timeExpired;
        this.aiChoice = this.possibleChoices[Math.floor(Math.random() * this.possibleChoices.length)];
         //rules
        if (this.playerChoice === this.aiChoice) {
            this.gameResult = 'Lol';
        } else if (
            (this.playerChoice === 'scissors' && this.aiChoice === 'paper') ||
            (this.playerChoice === 'rock' && this.aiChoice === 'scissors') ||
            (this.playerChoice === 'paper' && this.aiChoice === 'rock')
        ) {
            this.gameResult = 'Player Wins!';
        } else {
            this.gameResult = 'AI Wins!';
        }
    }
    create() {
        const background = this.add.image(512, 384, 'background');
        background.setAlpha(0.5);
        
        // Create player choice image with conditional tint
        const choiceImage = this.add.image(150, 384, this.playerChoice)
            .setOrigin(0.5)
            .setScale(0.2);

        // Create AI choice image
        const aiChoiceImage = this.add.image(874, 384, this.aiChoice)
            .setOrigin(0.5)
            .setScale(0.2)
            .setFlipX(true);

        // Add gray tint to non-selected choices
        this.possibleChoices.forEach(choice => {
            if (choice !== this.playerChoice) {
                const image = this.add.image(150, 384, choice)
                    .setOrigin(0.5)
                    .setScale(0.2)
                    .setTint(0x808080) // Add gray tint
                    .setVisible(false); // Hide it since we don't want multiple images
            }
        });

        const buttonStyle = {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
            fixedWidth: 200
        };
        const menuButton = this.add.text(512, 500, 'Results', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                EventBus.emit('game-result', this.gameResult);
                this.scene.start('Results');
            });
    }
}