import Model from "../Model";

describe('Test the Model class', () => {

  const MyModel = new Model();
  test('should return true if music is on, false otherwise', () => {
    expect(MyModel._musicOn).toBeTruthy();
    MyModel.musicOn = false;
    expect(MyModel._musicOn).toBeFalsy();
  });

  test("should return true if sound is on, false otherwise", () => {
    expect(MyModel._soundOn).toBeTruthy();
    MyModel.soundOn = false;
    expect(MyModel._soundOn).toBeFalsy();
  });

  test("should return true if background music is on, false otherwise", () => {
    expect(MyModel._bgMusicPlaying).toBeFalsy();
    MyModel.bgMusicPlaying = true;
    expect(MyModel._bgMusicPlaying).toBeTruthy();
  });

});