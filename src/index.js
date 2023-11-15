import Phaser from 'phaser';
import TitleScreen from './scenes/TitleScreen';
import GameScene from './scenes/GameScene';

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config);

game.scene.add('titlescreen', TitleScreen);
game.scene.add('gamescene', GameScene);

//game.scene.start('titlescreen');
game.scene.start('gamescene');