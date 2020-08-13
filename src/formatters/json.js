import generateRecursiveDiff from '../comparator';

const makeJsonDiff = (data) => `${JSON.stringify(data)}`;

const json = (filePath1, filePath2) => {
  const diff = generateRecursiveDiff(filePath1, filePath2);
  return makeJsonDiff(diff);
};

export default json;
