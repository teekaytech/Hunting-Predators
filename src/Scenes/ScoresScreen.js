import Phaser from "phaser";

export default class ScoresScreen extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  preload() {
    // load images
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
