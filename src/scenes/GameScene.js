import Phaser from 'phaser';
import CountdownController from './CountdownController';
import RedBalloon from '../assets/balloon_red_string_ram.png';
import TitleScreen from './TitleScreen';




class GameScene extends Phaser.Scene {

    constructor() {
        super();
        // Spawnvariables
        this.lastSpawnTime = 0;
        this.spawnInterval = 1000; // in milliseconds

        // Timer variables
        this.timer;
        this.initialTime = 10; // in seconds
        this.timerLabel;
    }
    preload() {
        this.load.image('red_balloon', RedBalloon);
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
        // Create and position your game object
        var gameObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            this.sys.game.config.height + 120,
            'red_balloon'
        ).setDepth(1).setScale(0.2);
        
        this.physics.add.existing(gameObject);
        gameObject.body.setVelocity(0, -200);
        gameObject.setInteractive();

        // Listen for the pointerdown event
        gameObject.on('pointerdown', function () {
            gameObject.destroy();
            // Add your custom logic here
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