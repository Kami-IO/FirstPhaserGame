import Phaser from 'phaser';
import InputField from './scenes/InputField';
import GameScene from './scenes/gameScene';
import GameCountdown from './scenes/GameCountdown';
import IntroScene from './scenes/IntroScene';
import { createClient } from '@supabase/supabase-js';

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

const initializeGame = async () => {
  const game = new Phaser.Game(config);

  const supabase = createClient(
    'https://dmigsdtcgybqkeizrwnc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaWdzZHRjZ3licWtlaXpyd25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNTM2OTAsImV4cCI6MjAxNjgyOTY5MH0.Vo0gwyHKGlAmCeu7DAHue-KI2Rt1HgZ7dp85jhE3NPY'
  );

  // Example: Insert data into a table
  const { data, error } = await supabase
    .from('TestDatabase1')
    .upsert([
      { id: 3, name: 'John Doe', age: 25 },
      { id: 4, name: 'Jane Doe', age: 30 },
    ]);

  if (error) {
    console.error('Error inserting data:', error.message);
  } else {
    console.log('Data inserted successfully:', data);
  }

  // Add scenes
  game.scene.add('introscene', IntroScene);
  game.scene.add('gamecountdown', GameCountdown);
  game.scene.add('inputfield', InputField);
  game.scene.add('gamescene', GameScene);

  // Start game
  game.scene.start('inputfield');

};

// Call the async function to initialize the game and insert data
initializeGame();



