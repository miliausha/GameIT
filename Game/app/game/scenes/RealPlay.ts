import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

interface MainGameData {
    playerChoice: string;
    timeExpired: boolean;
}

export class MainGame extends Scene {
    private playerSprite: Phaser.GameObjects.Sprite;
    private resultText: Phaser.GameObjects.Text;
    private playerChoice: string;
    private timeExpired: boolean;

    constructor() {
        super({ key: 'MainGame' });
    }

    init(data: MainGameData) {
        this.playerChoice = data.playerChoice;
        this.timeExpired = data.timeExpired;
    }

    create() {
        // Set up background
        this.cameras.main.setBackgroundColor(0x3498db);
        const background = this.add.image(512, 384, 'background');
        background.setAlpha(0.5);

        // Display player's choice
        this.showPlayerChoice();

        // Show result text
        if (this.timeExpired) {
            this.showTimeExpiredMessage();
        } else {
            this.showChoiceResult();
        }

        // Add a return to menu button
        this.createReturnButton();
    }

    private showPlayerChoice() {
        // Position for the player's choice display
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY - 100;

        // Add the choice text
        this.add.text(centerX, centerY - 100, 'Your Choice:', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Show the appropriate sprite based on choice
        const spriteKey = this.getChoiceSprite(this.playerChoice);
        this.playerSprite = this.add.sprite(centerX, centerY, spriteKey);
        this.playerSprite.setScale(2); // Adjust scale as needed

        // Add animation if sprites support it
        this.createChoiceAnimation();
    }

    private getChoiceSprite(choice: string): string {
        // Return the appropriate sprite key based on choice
        switch (choice) {
            case 'rock':
                return 'rock-sprite'; // Replace with your actual sprite key
            case 'paper':
                return 'paper-sprite'; // Replace with your actual sprite key
            case 'scissors':
                return 'scissors-sprite'; // Replace with your actual sprite key
            default:
                return 'default-sprite'; // Replace with your actual sprite key
        }
    }

    private createChoiceAnimation() {
        // Add a simple hover animation
        this.tweens.add({
            targets: this.playerSprite,
            y: '+=10',
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    private showTimeExpiredMessage() {
        this.resultText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            'Time Expired!',
            {
                fontFamily: 'Arial Black',
                fontSize: '48px',
                color: '#ff0000',
                stroke: '#000000',
                strokeThickness: 6
            }
        ).setOrigin(0.5);
    }

    private showChoiceResult() {
        const resultMessage = `You chose ${this.playerChoice.toUpperCase()}!`;
        this.resultText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            resultMessage,
            {
                fontFamily: 'Arial Black',
                fontSize: '38px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            }
        ).setOrigin(0.5);
    }

    private createReturnButton() {
        const button = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 200,
            'Return to Menu',
            {
                fontFamily: 'Arial Black',
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 }
            }
        )
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Game');
            });

        // Add hover effect
        button.on('pointerover', () => button.setStyle({ color: '#ffff00' }));
        button.on('pointerout', () => button.setStyle({ color: '#ffffff' }));
    }
}