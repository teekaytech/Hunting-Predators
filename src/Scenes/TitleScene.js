import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.plugin(
      "rexinputtextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      true
    );
  }

  create() {

    let headerLabel = this.add
      .text(230, 20, "Enter your name, Click `Submit`, `Play`!", {
        fontSize: "15px",
        // fixedWidth: 150,
        fixedHeight: 100,
      });

    let textLabel = this.add
      .text(config.width/2 - 100, config.height / 2 - 120, "PlayerName:", {
        fontSize: "20px",
        fixedWidth: 150,
        fixedHeight: 100,
      })
      .setOrigin(1);

    let inputText = this.add
      .rexInputText(config.width/2 + 360, 90, 200, 50, {
        type: "text",
        placeholder: "Enter player name",
        fontSize: "17px",
        color: "#FFFFFF",
        borderBottom: `3px solid #ffffff`,
      })
      .on("textchange", () => {
        textLabel.text = inputText.text;
      });

    this.submitButton = this.add.text(500, 80, "Submit", {
      fontFamily: "monospace",
      fontSize: 18,
      fontStyle: "bold",
      color: "#ffffff",
      backgroundColor: "#008081",
      padding: 5,
    });

    this.submitButton.setInteractive();

    this.submitButton.on("pointerup", () => {
      if (textLabel.text.length > 0) {
        config.playerName = inputText.text;
        inputText.text = "";
      }
    });

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 150, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 - 50, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Scores
    this.scoresButton = new Button(this, config.width / 2, config.height / 2 + 50, 'blueButton1', 'blueButton2', 'Scores', 'Scores');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 150, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.textLabel = this.add.text(
      230,
      config.height / 2 + 250,
      "By: Taofeek OLALERE (@teekaytech)",
      {
        fontSize: "17px",
      }
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("bgMusic", { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }


  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100,
        config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      this.gameText,
      gameButton,
    );
  }
}
