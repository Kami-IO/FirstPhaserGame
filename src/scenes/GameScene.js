import Phaser from 'phaser';
import CountdownController from './CountdownController';
import RedBalloon from '../assets/balloon_red_string_ram.png';
import Explosion1 from '../assets/explosion1.png';
import Explosion2 from '../assets/explosion2.png';
import Explosion3 from '../assets/explosion3.png';
import Explosion4 from '../assets/explosion4.png';
import Explosion5 from '../assets/explosion5.png';
import Explosion6 from '../assets/explosion6.png';
import TitleScreen from './TitleScreen';




class GameScene extends Phaser.Scene {

    constructor() {
        super();
        // Spawnvariables
        this.lastSpawnTime = 0;
        this.spawnInterval = 200; // in milliseconds

        // Timer variables
        this.timer;
        this.initialTime = 10; // in seconds
        this.timerLabel;
    }
    preload() {
        this.load.image('red_balloon', RedBalloon);
        this.load.image('explosion_image1', Explosion1);
        this.load.image('explosion_image2', Explosion2);
        this.load.image('explosion_image3', Explosion3);
        this.load.image('explosion_image4', Explosion4);
        this.load.image('explosion_image5', Explosion5);
        this.load.image('explosion_image6', Explosion6);
    }

    create() {
        const text = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, 'Game Scene');
        text.setOrigin(0.5, 0.5);

        this.startCountdown();

        //const ball = this.add.circle(Phaser.Math.Between(0,600), 600, 10, 0xffffff, 1);
        //this.physics.add.existing(ball);

        //ball.body.setVelocity(0, -100);

        //this.spawnObject();
        //const timerLabel = this.add.text(width * 0.5, 50, '45', {fontSize: 48}).setOrigin(0.5);

        //const countdown = new CountdownController(this, timerLabel);
        //this.countdown.start(this.handleCountdownFinished.bind(this));
    }

    update(time, delta) {
        
        if (time - this.lastSpawnTime > this.spawnInterval) {
            this.spawnObject();
            this.lastSpawnTime = time;
        }
        //this.countdown.update();
        
    }

    spawnObject() {
        // Create and position your the balloon
        const balloonObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            this.sys.game.config.height + 120,
            'red_balloon'
        ).setDepth(1).setScale(0.2);
  
        
        this.physics.add.existing(balloonObject);
        balloonObject.body.setVelocity(0, -200);
        balloonObject.setInteractive();
        
        // Declare the explosion variable outside the callback
        let explosion;
        // Listen for the pointerdown event
        balloonObject.on('pointerdown', () => {
            balloonObject.destroy();
            
             // Create a new image at the position of the destroyed balloonObject
        const explosion = this.add.sprite(
            balloonObject.x,
            balloonObject.y,
            'explosion_image1'
        ).setDepth(1).setScale(0.6);
        
        // const explosion2 = this.add.image(
        //     balloonObject.x,
        //     balloonObject.y,
        //     'explosion_image2'
        // ).setDepth(1).setScale(0.6);
        // const explosion3 = this.add.image(
        //     balloonObject.x,
        //     balloonObject.y,
        //     'explosion_image3'
        // ).setDepth(1).setScale(0.6);
        // const explosion4 = this.add.image(
        //     balloonObject.x,
        //     balloonObject.y,
        //     'explosion_image4'
        // ).setDepth(1).setScale(0.6);
        // const explosion5 = this.add.image(
        //     balloonObject.x,
        //     balloonObject.y,
        //     'explosion_image5'
        // ).setDepth(1).setScale(0.6);
        // const explosion6 = this.add.image(
        //     balloonObject.x,
        //     balloonObject.y,
        //     'explosion_image6'
        // ).setDepth(1).setScale(0.6);
        // Add explosion frames
        // explosion.addFrame('explosion_image1');
        // explosion.addFrame('explosion_image1');
        // explosion.addFrame('explosion_image1');
        // explosion.addFrame('explosion_image1');
        // explosion.addFrame('explosion_image1');
        // explosion.addFrame('explosion_image1');

        // Set up animation
        this.anims.create({
            key: 'explode',
            frames: [
                { key: 'explosion_image1' },
                { key: 'explosion_image2' },
                { key: 'explosion_image3' },
                { key: 'explosion_image4' },
                { key: 'explosion_image5' },
                { key: 'explosion_image6' }
            ],
            frameRate: 20, // Number of frames per second
            repeat: 0 // Play the animation only once
        });

        // Play the animation
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });

        explosion.play('explode');
    });
    }

    startCountdown() {
        // Display the initial time
        this.timerLabel = this.add.text(10, 10, 'Time left: ' + this.formatTime(this.initialTime), { fontSize: '32px', fill: '#fff' });

        // Create a countdown timer
        this.timer = this.time.addEvent({
            delay: 1000, // 1 second
            repeat: this.initialTime - 1, // Repeat the event `initialTime` times (initialTime - 1 because we're already displaying the initial time)
            callback: this.onTimerTick,
            callbackScope: this,
        });
    }

    onTimerTick() {
        // Update the displayed time
        this.timerLabel.setText('Time left: ' + this.formatTime(this.timer.repeatCount));

        // Check if the timer has reached 0
        if (this.timer.repeatCount === 0) {
            this.endGame(); // Add your logic for what should happen when the timer reaches 0
        }
    }

    endGame() {
        // Add logic for what should happen when the game ends
        console.log('Game Over!');
        this.scene.start('titlescreen');
        
    }

    formatTime(seconds) {
        // Format the time as mm:ss
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    

    handleCountdownFinished() {

    }
}



export default GameScene;