import Phaser from 'phaser';
import config from "../Config/config";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // load images
    // this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.predator1 = this.add.sprite(
      config.width - 50,
      config.height / 2 - 100,
      "predator"
    );
    this.predator2 = this.add.sprite(
      config.width - 50,
      config.height / 2,
      "predator"
    );
    this.predator3 = this.add.sprite(
      config.width - 50,
      config.height / 2 + 100,
      "predator"
    );
    this.predator_alien = this.add.sprite(
      config.width - 50,
      config.height / 2 - 100,
      "predator_a"
    );
    this.player = this.add.image(70, config.height / 2, "player");

    this.predator1.setScale(0.6);
    this.predator2.setScale(0.6);
    this.predator3.setScale(0.6);
    this.player.setScale(0.5);

    this.anims.create({
      key: "pred_anim",
      frames: this.anims.generateFrameNumbers("predator"),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "pred_al_anim",
      frames: this.anims.generateFrameNumbers("predator_a"),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true
    });

    this.predator1.play("pred_anim");
    this.predator2.play("pred_anim");
    this.predator3.play("pred_anim");
    this.predator_alien.play("pred_al_anim");

    //making predators destroyable
    this.predator1.setInteractive();
    this.predator2.setInteractive();
    this.predator3.setInteractive();
    this.predator_alien.setInteractive();

    this.input.on('gameobjectdown', this.destroyPredator, this);
  }

  resetPredatorPos(pred) {
    pred.x = config.width;
    const randomY = Phaser.Math.Between(0, config.height);
    pred.y = randomY;
  }

  movePredator(pred, speed) {
    pred.x -= speed;
    if (pred.x <= 0) {
      this.resetPredatorPos(pred);
    }
  }

  destroyPredator(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }

  update() {
    this.movePredator(this.predator1, 3);
    this.movePredator(this.predator2, 1);
    this.movePredator(this.predator3, 2);
    this.movePredator(this.predator_alien, 4);
  }
}
