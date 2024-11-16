import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
    private background?: Phaser.GameObjects.Image;
    // private logo?: Phaser.GameObjects.Image;
    private startButton?: Phaser.GameObjects.Text;

    constructor () {
        super('MainMenu');
    }

    create () {
        console.log('MainMenu: Scene started');

        // Set up background
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        // Add title text
        const title = this.add.text(512, 200, 'Rock Paper Scissors', {
            fontFamily: 'Arial Black',
            fontSize: '54px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Add start button
        this.startButton = this.add.text(512, 384, 'Start Game', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.startButton.setStyle({ color: '#ff0' }))
        .on('pointerout', () => this.startButton.setStyle({ color: '#fff' }))
        .on('pointerdown', () => this.startGame());

        // Notify that the scene is ready
        EventBus.emit('current-scene-ready', this);
        
        console.log('MainMenu: Setup complete');
    }

    startGame () {
        console.log('MainMenu: Starting game');
        this.scene.start('Game');
    }

    changeScene () {
        this.startGame();
    }
}
