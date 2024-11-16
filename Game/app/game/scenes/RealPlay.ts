// scenes/RealPlay.ts
import { Scene } from 'phaser';

interface GameData {
    playerChoice: string;
    timeExpired: boolean;
}

export class RealPlay extends Scene {
    private playerChoice: string;
    private timeExpired: boolean;

    constructor() {
        super('RealPlay');
    }

    init(data: GameData) {
        this.playerChoice = data.playerChoice;
        this.timeExpired = data.timeExpired;
    }

    create() {
        const background = this.add.image(512, 384, 'background');
        background.setAlpha(0.5);

        const choiceImage = this.add.image(150, 384, this.playerChoice)
            .setOrigin(0.5)
            .setScale(0.2);


        const buttonStyle = {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
            fixedWidth: 200
        };

        const menuButton = this.add.text(512, 500, 'MENU', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}