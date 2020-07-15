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

const checkKeyPresence = (tree, key) => Object.prototype.hasOwnProperty.call(tree, key);

const generateRecursiveDiff = (tree1, tree2) => {
  const file1 = parse(tree1);
  const file2 = parse(tree2);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const allKeys = _.union(keys1, keys2);

  return allKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (_.isObject(value1) && checkKeyPresence(file1, key)
      && checkKeyPresence(file2, key) && !_.isObject(value2)) {
      acc[`- ${key}`] = generateRecursiveDiff(value1, value1);
      acc[`+ ${key}`] = value2;
      return acc;
    }
    if (_.isObject(value1) && checkKeyPresence(file1, key)
      && checkKeyPresence(file2, key)) {
      acc[`  ${key}`] = generateRecursiveDiff(value1, value2);
      return acc;
    }
    if (_.isObject(value1) && checkKeyPresence(file1, key)
      && !checkKeyPresence(file2, key)) {
      acc[`- ${key}`] = generateRecursiveDiff(value1, value1);
      return acc;
    }
    if (_.isObject(value2) && !checkKeyPresence(file1, key) && checkKeyPresence(file2, key)) {
      acc[`+ ${key}`] = generateRecursiveDiff(value2, value2);
      return acc;
    }
    if (value2 === value1) {
      acc[`  ${key}`] = value1;
    } else if (!checkKeyPresence(file1, key)) {
      acc[`+ ${key}`] = value2;
    } else if (!checkKeyPresence(file2, key)) {
      acc[`- ${key}`] = value1;
    } else if (value2 !== value1) {
      acc[`+ ${key}`] = value2;
      acc[`- ${key}`] = value1;
    }
    return acc;
  }, {});
};

export { compare, generateRecursiveDiff };
