import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', 'assets/zenva_logo.png');
    this.load.image("background", 'assets/underwater3.png');
  }

  create () {
    this.scene.start('Preloader');
  }
};