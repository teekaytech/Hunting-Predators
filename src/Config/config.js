import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  parent: "divId",
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  playerName: '',
  playerScore: 0
};
