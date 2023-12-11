import Phaser from 'phaser';
import Flag from '../assets/flag.png';

class IntroScene extends Phaser.Scene {
    constructor() {
        super();

        this.lastFlagSpawnTime = 0;
        this.flagSpawnInterval = 400;
    }

    preload() {
        this.load.image('flag', Flag);
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        const topText = this.add.text(screenCenterX, screenCenterY, 'POP BALLONER & VIND!').setColor('White');
        topText.setOrigin(0.5, 0.5).setFont('Roboto').setBackgroundColor("#164196").setFontSize(82).setPadding({x:10});

        const startButton = this.add.text(screenCenterX, screenCenterY, 'START GAME').setColor("White");
        startButton.setOrigin(0.5, 0.5).setFont('Roboto').setBackgroundColor("#164196").setFontSize(82).setPadding({x:10});

        startButton.setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('gamecountdown');
        })
    }
    update(time, delta) {
        
        if (time - this.lastFlagSpawnTime > this.flagSpawnInterval) {
            this.spawnFlagObject();
            this.lastFlagSpawnTime = time;
        }
        //this.countdown.update();
        
    }

    spawnFlagObject() {
        const flagObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            -this.sys.game.config.height + 400, // spawner lige over browser vinduet
            'flag'
        ).setDepth(0).setScale(0.1);

        this.physics.add.existing(flagObject);
        flagObject.body.setVelocity(0, 100);

        
    // Set initial rotation and angular velocity
    flagObject.rotation = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360)); // Random initial rotation
    const angularVelocity = Phaser.Math.FloatBetween(-180, 180); // Random angular velocity

    // Set initial horizontal velocity
    const horizontalVelocity = Phaser.Math.FloatBetween(-50, 50); // Random horizontal velocity

    this.physics.add.existing(flagObject);

    // Set angular velocity
    flagObject.body.angularVelocity = angularVelocity;

    // Set horizontal velocity
    flagObject.body.setVelocityX(horizontalVelocity);
    flagObject.body.setVelocityY(100); // Vertical velocity

    // Optional: Add damping to gradually slow down rotation and movement
    flagObject.body.angularDamping = 0.95;
    flagObject.body.linearDamping = 0.95;

    // Set opacity (e.g., 0.5 for half-transparent)
    flagObject.setAlpha(0.4);
    }
}

export default IntroScene;