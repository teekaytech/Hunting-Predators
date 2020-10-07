import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'divId',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  playerName: 'Guest Player',
  playerScore: 0,
  gameOn: true,
};
