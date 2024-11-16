import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Results extends Scene {
    private gameResult: string = '';
    constructor() {
        super('Results');  
        EventBus.on('game-result', (result: string) => {
            this.gameResult = result;
        });
    }
    create() {
        const background = this.add.image(512, 384, 'background');
        background.setAlpha(0.5);
        const resultStyle = {
            fontFamily: 'Arial Black',
            fontSize: 60,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 29, y: 10 },
            align: 'center'
        };
        //results
        const resultText = this.add.text(512, 384, this.gameResult,resultStyle)
        .setOrigin(0.5);
        //play again
        const buttonStyle = {
            fontFamily: 'Arial Black',
            fontSize: 30,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 17, y: 10 },
            fixedWidth: 200
        };
        const playAgainButton = this.add.text(512, 500, 'Play Again',buttonStyle)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        playAgainButton.on('pointerover', () => {
            playAgainButton.setStyle({ color: '#ffff00' });});

        playAgainButton.on('pointerout', () => {
            playAgainButton.setStyle({ color: '#ffffff' });});
    }    shutdown() {
        EventBus.removeAllListeners('game-result');
    }
}