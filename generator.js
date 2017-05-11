const debug = require('debug')('powerdata');
module.exports = getPowerData;

let lastValue = [55566, 52939, 60307];
let deviation = [-3000, 3000];

debug(`START: value(${lastValue}) deviation(${deviation})`);
/**
 * Return new random power data
 */
function getPowerData() {
  lastValue = randomize(lastValue);
  return lastValue;
}

/**
 * Randomize the lastValue powerdata
 * @param  {Array} lastValue [avg, min, max]
 * @return {Array} [avg, min, max]
 */
function randomize(lastValue) {
  let min = lastValue[1] + getRandomNumber(deviation);
  let max = lastValue[2] + getRandomNumber(deviation);
  let avg = Math.floor((min + max) / 2);

  while (min > max) {
    min = lastValue[1] + getRandomNumber(deviation);
  }

  while (max - min > 20000) {
    max = lastValue[2] + getRandomNumber(deviation);
  }

  if (avg < 0) {
    avg = 0;
  }

  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  const newValue = [avg, min, max];
  debug(newValue);
  return newValue;
}

/**
 * Generates random number delta based on deviation
 * @param  {Array}  deviation [min, max]
 * @return {Number} number delta
 */
function getRandomNumber(deviation) {
  return Math.floor(Math.random() * (deviation[1] - deviation[0] + 1)) + deviation[0];
}

/**
 * Move deviation min/max
 * total delta is always 6000
 * 0 resets the deviation to the default [-3000, 3000]
 *
 * @param  {Number} change Change to be applied to the deviation
 *
 * Usage:
 * updateDeviation(2000); // deviation = [-1000, 5000];
 * updateDeviation(-3000); // deviation = [-4000, 2000];
 */
function updateDeviation(change) {
  if (change === 0) {
    return deviation = [-3000, 3000];
  }
  return deviation = [deviation[0] + change, deviation[1] + change];
}

// Update deviation randomly to simulate power usage
let counter = 0;
setInterval(() => {
  if (counter % 5 === 0) {
    updateDeviation(getRandomNumber([-3000, 3000]));
    debug('deviation: ' + deviation);
  } else {
    updateDeviation(0);
  }

  counter++;
}, 1000);
