const Utils = (() => {
  const sortScores = unsorted => {
    return unsorted.sort((a, b) => b.score - a.score );
  }

  const getIterations = result => {
    let times = 15;
    if (result.length <= 15) {
      times = result.length;
    }
    return times;
  }

  return { sortScores, getIterations }
})();

export default Utils;