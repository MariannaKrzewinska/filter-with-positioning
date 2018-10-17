const _ = require('lodash');

const query = 'abs';
const texts = [
  'absolute',
  'not absolute',
  'abbbbsolute',
  'bas',
  'fabrials',
  'a and b',
  'not found',
];

const getDistanceValue = (indexes, currentIndex, currentIndexValue) => {
  if (_.isNil(indexes[currentIndex - 1])) {
    return 0;
  }

  if (indexes[currentIndex - 1] !== -1) {
    return currentIndexValue - indexes[currentIndex - 1];
  }
  return getDistanceValue(indexes, currentIndex - 1, currentIndexValue);
}

const getTextSimilarityIndex = (query, text) => {
  const caseInsensitiveText = text.toLowerCase();
  const indexes = query
    .toLowerCase()
    .split('')
    .map(letter => _.indexOf(caseInsensitiveText, letter));

  const numberOfFoundLetters = indexes.filter(index => index !== -1).length;

  if (numberOfFoundLetters === 0) { return 0; }

  const numberOfLettersInQuery = query.length;

  const sumOfDistances = indexes
    .map((letterIndex, index) => {
      if (letterIndex === -1) { return 0; }
      return getDistanceValue(indexes, index, letterIndex);
    })
    .map(Math.abs)
    .reduce((acc, curr) => acc + curr, 0)

  const averageDistanceBetweenFoundLetters = sumOfDistances / numberOfFoundLetters;

  return numberOfFoundLetters / (numberOfLettersInQuery * averageDistanceBetweenFoundLetters);
}

const results = texts.map(text => getTextSimilarityIndex(query, text));

console.log(results);
