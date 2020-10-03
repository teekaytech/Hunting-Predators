import Phaser from "phaser";

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  preload() {
    // load images
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    this.add.image(400, 300, 'logo');
    // this.add.text(20, 20, "hello world");
  }
}
