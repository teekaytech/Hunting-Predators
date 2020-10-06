import Phaser from 'phaser';
import config from "../Config/config";
import Laser from '../Objects/Laser';
import ProcessScore from "../Scores/serviceApi";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
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

    this.aliens = this.physics.add.group({
      key: "predator_a",
      repeat: 4,
      setXY: {
        x: config.width - 40,
        y: config.height / 2 - 200,
        stepY: Phaser.Math.Between(45, 60),
      },
    });

    this.predators.children.iterate((predator) => {
      predator.setScale(0.6);
      predator.play("pred_anim");
      predator.setInteractive();
    });

    this.aliens.children.iterate((alien) => {
      alien.setScale(0.6);
      alien.play("pred_al_anim");
    });

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

    this.physics.add.overlap(
      this.aliens,
      this.player,
      this.endGame,
      null,
      this
    );

    this.physics.add.overlap(
      this.predators,
      farm,
      this.looseGame,
      null,
      this
    );

    this.scoreText = this.add.text(32, 16, 'Score: 0', {
      fontSize: "20px",
      fill: "#000",
    });
    this.overText = this.add.text(250, 300, `Game Over!`, {
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
    }
  }

  goHome() {
    config.gameOn = false;
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  destroyPredator(laser, predator) {
    predator.setActive(false);
    predator.setVisible(false);
    this.resetPredatorPos(predator);
    this.updateScore();
    if (this.predators.getTotalUsed() === 4) {
      this.predators.children.iterate((child) => {
        child.setActive(true);
        child.setVisible(true);
      });
    }
  }

  updateScore() {
    config.playerScore += 10;
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

  prepareEnd(text) {
    this.scene.pause();
    this.overText.setText(text);
    this.overText.setVisible(true);
    this.goHome();
  }

  endGame() {
    this.prepareEnd("You are busted");
  }

  looseGame() {
    this.prepareEnd("Predators Win. Game Over!");
  }

  submitScore() {
    if (config.playerName !== '' && config.playerScore !== 0) {
      console.log(ProcessScore.setScore(config.playerName, config.playerScore));
    }
  }

  update() {
    this.predators.children.iterate((predator) => {
      this.movePredator(predator, Phaser.Math.Between(1, 1.8));
    });

    this.aliens.children.iterate((alien) => {
      this.movePredator(alien, Phaser.Math.Between(3, 4));
    });

    this.movePlayer(this.player);

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootLaser();
    }

    this.scoreText.setText("Score: " + config.playerScore);

    if (!config.gameOn) {
      this.submitScore();
    }
  }
}
