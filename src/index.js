import Phaser from 'phaser';
import TitleScreen from './scenes/TitleScreen';
import GameScene from './scenes/gameScene';
import GameCountdown from './scenes/GameCountdown';
import IntroScene from './scenes/IntroScene';

const config = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }, 
    backgroundColor: 0xfafafa,
    resolution: window.devicePixelRatio || 1,
}

const game = new Phaser.Game(config);

// Add scenes
game.scene.add('introscene', IntroScene);
game.scene.add('gamecountdown', GameCountdown);
game.scene.add('titlescreen', TitleScreen);
game.scene.add('gamescene', GameScene);

// Start game
game.scene.start('introscene');