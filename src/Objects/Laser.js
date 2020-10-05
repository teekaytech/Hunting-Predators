class MyLaser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
  }

  fire(x,y) {
    this.body.reset(x,y);

    this.setActive(true);
    this.setVisible(true);
    this.setScale(2.5);

    this.setVelocityX(600);
  }

  disableLaser() {
    this.setActive(false);
    this.setVisible(false);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.x > 700) {
      this.disableLaser();
    }
  }
}

export default class Laser extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: MyLaser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: "laser",
    });
  }

  fireLaser(x,y) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x,y);
    }
  }
}