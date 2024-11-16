import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        // Load essential assets for the preloader
        this.load.image('background', 'assets/bg.png');
        
        // Add console log for debugging
        console.log('Boot scene loaded');
    }

    create ()
    {
        console.log('Starting Preloader scene');
        this.scene.start('Preloader');
    }
}
