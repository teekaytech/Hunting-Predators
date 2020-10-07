import Utils from "../Objects/utils";

const all_results = {
  result: [
    { user: "John Doe", score: 42, },
    { user: "Peter Parker", score: 35, },
    { user: "Wonder Woman", score: 50, },
  ]
};

describe('A module for utility functions', () => {
  it('should return an array of objects sorted by score property', () => {
    const result = Utils.sortScores(all_results.result);
    expect(result[0].score).toBe(50);
    expect(result[1].score).toBe(42);
    expect(result[2].score).toBe(35);
  });

  it('should return the number of results', () => {
    expect(Utils.getIterations(all_results.result)).toBe(3)
  });
});