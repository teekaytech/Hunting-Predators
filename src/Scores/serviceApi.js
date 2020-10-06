const ProcessScore = (() => {
  const url = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";
  const appName = { name: "Hunting Predators" };
  const id = "Eh4I43JSbV8zFIO4A8iS";
  let endpoint = ''

  const makeGame = async () => {
    endpoint = `${url}games/`;
    const response = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(appName),
    });
    const output = await response.json();
    return output;
  }

  const setScore = async (pName, points) => {
    endpoint = `${url}games/${id}/scores/`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user: pName, score: points }),
      });
      const output = await response.json();
      return output;
    } catch (error) {
      return false;
    }
  }

  const getScores = async () => {
    endpoint = `${url}games/${id}/scores/`;
    try {
      const response = await fetch(endpoint);
      const scores = await response.json();
      return scores;
    } catch (error) {
      return false;
    }
  }

  return { setScore, getScores };
})();

export default ProcessScore;