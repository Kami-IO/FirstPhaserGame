import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        const startButton = this.add.text(screenCenterX, screenCenterY, 'START GAME').setColor("White");
        startButton.setOrigin(0.5, 0.5).setFont('Roboto').setBackgroundColor("#164196").setFontSize(82).setPadding({x:10});

        startButton.setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('gamecountdown');
        })
    }
}

export default IntroScene;