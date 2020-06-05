import _ from 'lodash';

const fs = require('fs');
const process = require('process');
const path = require('path');

const compare = (pathToFile1, pathToFile2) => {
  const resultData = [];
  const currentDir = process.cwd();
  const absolutePathFile1 = path.resolve(currentDir, pathToFile1);
  const absolutePathFile2 = path.resolve(currentDir, pathToFile2);
  const file1 = JSON.parse(fs.readFileSync(absolutePathFile1, 'ascii'));
  const file2 = JSON.parse(fs.readFileSync(absolutePathFile2, 'ascii'));
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
