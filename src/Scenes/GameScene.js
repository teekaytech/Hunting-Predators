import Phaser from 'phaser';
import config from "../Config/config";
import Laser from '../Objects/Laser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    this.score = 0;
    this.laserGroup;
  }

  preload() {
    this.add.image(400, 300, "field");
  }

  create() {
    const farm = this.physics.add.staticGroup();
    farm.create(0, 300, "farm");

    this.predators = this.physics.add.group({
      key: "predator",
      repeat: 10,
      setXY: {
        x: config.width - 20,
        y: 40,
        stepY: 50,
      },
    });

    this.predators.children.iterate((child) => {
      child.setScale(0.6);
      child.play("pred_anim");
      child.setInteractive();
    });

    // this.predators.create(
    //   config.width - 50,
    //   config.height / 2 - 100,
    //   "predator"
    // );

    // this.predators.create(
    //   config.width - 50,
    //   config.height / 2,
    //   "predator"
    // );

    // this.predators.create(
    //   config.width - 50,
    //   config.height / 2 + 100,
    //   "predator"
    // );

    // this.predator_alien = this.predators.create(
    //   config.width - 50,
    //   config.height / 2 - 200,
    //   "predator_a"
    // );

    // this.predator_alien2 = this.predators.create(
    //   config.width - 50,
    //   config.height / 2 + 200,
    //   "predator_a"
    // );

    // this.predator_alien3 = this.predators.create(
    //   config.width - 50,
    //   config.height / 2 - 100,
    //   "predator_a"
    // );

    // this.predator_alien.play("pred_al_anim");
    // this.predator_alien2.play("pred_al_anim");
    // this.predator_alien3.play("pred_al_anim");

    //adding the player
    this.player = this.physics.add.image(70, config.height / 2, "player");
    this.player.setScale(0.5);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.laserGroup = new Laser(this);

    this.physics.add.overlap(
      this.laserGroup,
      this.predators,
      this.destroyPredator,
      null,
      this
    );

    this.scoreText = this.add.text(32, 16, "score: 0", {
      fontSize: "20px",
      fill: "#000",
    });
    this.overText = this.add.text(200, config.height / 2, `Game Over!`, {
      fontSize: "30px",
      fill: "#F00",
    });
    this.overText.setVisible(false);
  }

  resetPredatorPos(pred) {
    pred.x = config.width;
    const randomY = Phaser.Math.Between(30, config.height - 30);
    pred.y = randomY;
  }

  movePredator(pred, speed) {
    pred.x -= speed;
    if (pred.x < 0) {
      this.resetPredatorPos(pred);

      //   this.scene.pause();
      //   this.overText.setText(`Game Over! Score: ${this.score}`);
      //   this.overText.setVisible(true);
      //   setTimeout(() => {
      //     this.scene.start("Title");
      //   }, 3000);
    }
  }

  destroyPredator(laser, predator) {
    predator.setActive(false);
    predator.setVisible(false);
    this.updateScore();
    if (this.predators.getTotalUsed() === 2) {
      let i = 1;
      this.predators.children.iterate((child) => {
        child.setActive(true);
        child.setVisible(true);
      });
    };
  }

  updateScore() {
    this.score += 10;
  }

  movePlayer(plyr) {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      plyr.body.velocity.y = -300;
    } else if (this.cursorKeys.down.isDown) {
      plyr.body.velocity.y = 300;
    } else {
      this.player.setVelocityY(0);
    }
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.player.x + 15, this.player.y + 12);
  }

  update() {
    this.predators.children.iterate((child) => {
      this.movePredator(child, Phaser.Math.Between(1, 2.5));
    });

    // this.movePredator(this.predator_alien, 0.7);
    // this.movePredator(this.predator_alien2, 1);
    // this.movePredator(this.predator_alien3, 2);
    this.movePlayer(this.player);

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootLaser();
    }
    this.scoreText.setText("Score: " + this.score);
  }
}
