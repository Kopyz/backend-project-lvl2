import _ from 'lodash';
import parse from './parsers';

const compare = (pathToFile1, pathToFile2) => {
  const resultData = [];
  const file1 = parse(pathToFile1);
  const file2 = parse(pathToFile2);
  const keys = _.union(Object.keys(file1), Object.keys(file2));

  keys.forEach((key) => {
    if (file2[key] === file1[key]) {
      resultData.push(`${key}: ${file1[key]}`);
    } else if (file1[key] === undefined) {
      resultData.push(`+ ${key}: ${file2[key]}`);
    } else if (file2[key] === undefined) {
      resultData.push(`- ${key}: ${file1[key]}`);
    } else if (file2[key] !== file1[key]) {
      resultData.push(`+ ${key}: ${file2[key]}`);
      resultData.push(`- ${key}: ${file1[key]}`);
    }
  });
  return resultData;
};

export default compare;
