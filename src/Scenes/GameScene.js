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

    this.predator1.setScale(0.6);
    this.predator2.setScale(0.6);
    this.predator3.setScale(0.6);

    this.predator1.play("pred_anim");
    this.predator2.play("pred_anim");
    this.predator3.play("pred_anim");
    this.predator_alien.play("pred_al_anim");

    this.predator1.setInteractive();
    this.predator2.setInteractive();
    this.predator3.setInteractive();
    this.predator_alien.setInteractive();

    this.input.on('gameobjectdown', this.destroyPredator, this);

    //adding the player
    this.player = this.physics.add.image(70, config.height / 2, "player");
    this.player.setScale(0.5);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  resetPredatorPos(pred) {
    pred.x = config.width;
    const randomY = Phaser.Math.Between(30, config.height - 30);
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

  movePlayer(plyr) {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      plyr.body.velocity.y = -200;
    } else if (this.cursorKeys.down.isDown) {
      plyr.body.velocity.y = 200;
    } else {
      this.player.setVelocityY(0);
    }
  }

  update() {
    this.movePredator(this.predator1, 2);
    this.movePredator(this.predator2, 1);
    this.movePredator(this.predator3, 1.5);
    this.movePredator(this.predator_alien, 3);
    this.movePlayer(this.player);

    // if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
    //   this.fireLaser();
    // }
  }
}
