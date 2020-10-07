import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('background', 'assets/bg.jpg');
  }

  create() {
    this.scene.start('Preloader');
  }
}