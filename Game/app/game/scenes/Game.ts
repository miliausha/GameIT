import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { GameObjects } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    timerText: Phaser.GameObjects.Text;
    rockButton: Phaser.GameObjects.Text;
    paperButton: Phaser.GameObjects.Text;
    scissorsButton: Phaser.GameObjects.Text;
    playerChoice: string;
    timeLeft: number;
    timerEvent: Phaser.Time.TimerEvent;
    bothPlayersReady: boolean;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(512, 234, 'Choose your move:', {
            fontFamily: 'Arial Black', 
            fontSize: 38, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.timerText = this.add.text(512, 284, '10', {
            fontFamily: 'Arial Black',
            fontSize: 48,
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const buttonStyle = {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
            fixedWidth: 200
        };

        this.rockButton = this.add.text(512, 384, 'ROCK', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.makeChoice('rock'));

        this.paperButton = this.add.text(512, 454, 'PAPER', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.makeChoice('paper'));

        this.scissorsButton = this.add.text(512, 524, 'SCISSORS', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.makeChoice('scissors'));

        this.timeLeft = 10;
        this.bothPlayersReady = false;

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        EventBus.on('player-choice', (otherPlayerChoice: string) => {
            if (this.playerChoice && otherPlayerChoice) {
                this.bothPlayersReady = true;
            }
        });

        EventBus.emit('current-scene-ready', this);
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText(this.timeLeft.toString());

        if (this.timeLeft <= 0 || this.bothPlayersReady) {
            this.timerEvent.remove();
            this.changeScene();
        }
    }

    makeChoice(choice: string) {
        this.playerChoice = choice;
        
        this.rockButton.setAlpha(0.5).disableInteractive();
        this.paperButton.setAlpha(0.5).disableInteractive();
        this.scissorsButton.setAlpha(0.5).disableInteractive();
        
        EventBus.emit('player-choice', choice);
    }
    changeScene ()
    {
        this.scene.start('RealPlay', { 
            playerChoice: this.playerChoice,
            timeExpired: this.timeLeft <= 0
        });
    }
}
