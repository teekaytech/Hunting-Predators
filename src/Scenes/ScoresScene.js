import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import ProcessScore from '../Scores/serviceApi';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  create() {
    this.add.text(config.width / 2 - 130, 35, 'Scores Board', {
      fontSize: '40px',
    });
    ProcessScore.getScores().then((response) => {
      const sorted = this.sortScores(response.result);
      const iterations = this.getIterations(sorted);
      for (let index = 0; index < iterations; index += 1) {
        this.add.text(90, 100 + index * 30, index + 1, {
          fontSize: '20px',
        });
        this.add.text(290, 100 + index * 30, response.result[index].user, {
          fontSize: '20px',
        });
        this.add.text(590, 100 + index * 30, response.result[index].score, {
          fontSize: '20px',
        });
      }
    });

    this.menuButton = new Button(this, 700, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }

  sortScores(unsorted) {
    return unsorted.sort((a, b) => b.score - a.score );
  }

  getIterations(result) {
    let times = 15;
    if (result.length <= 15) {
      times = result.length;
    }
    return times;
  }
}
