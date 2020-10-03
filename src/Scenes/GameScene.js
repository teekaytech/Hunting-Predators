import Phaser from 'phaser';
import config from "../Config/config";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    // this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.predator = this.add.image(50, config.height/2, 'predator');
    this.player = this.add.image(config.width - 150, config.height/2, 'player');

    this.player.flipX = true;
    this.predator.flipX = true;
    this.predator.setScale(0.5);
    this.player.setScale(0.5);

  }
}
