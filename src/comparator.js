import _ from 'lodash';
import parse from './parsers';

const generateRecursiveDiff = (filePath1, filePath2) => {
  const data1 = parse(filePath1);
  const data2 = parse(filePath2);

  const iter = (parsedData1, parsedData2) => {
    const keys1 = Object.keys(parsedData1);
    const keys2 = Object.keys(parsedData2);
    const allKeys = _.union(keys1, keys2);

    return allKeys.reduce((acc, key) => {
      const currentNode = {};
      currentNode.name = key;

      if (_.has(parsedData1, key) && !_.has(parsedData2, key)) {
        currentNode.type = 'remove';
        currentNode.valueBefore = parsedData1[key];
      } else if (!_.has(parsedData1, key) && _.has(parsedData2, key)) {
        currentNode.type = 'add';
        currentNode.valueAfter = parsedData2[key];
      } else if (_.isObject(parsedData1[key]) && _.isObject(parsedData2[key])) {
        currentNode.type = 'branch';
        currentNode.children = iter(parsedData1[key], parsedData2[key]);
      } else if (parsedData1[key] === parsedData2[key]) {
        currentNode.type = 'unchange';
        currentNode.valueAfter = parsedData2[key];
      } else {
        currentNode.type = 'update';
        currentNode.valueAfter = parsedData2[key];
        currentNode.valueBefore = parsedData1[key];
      }
      acc.push(currentNode);
      return acc;
    }, []);
  };
  return iter(data1, data2);
};

export default generateRecursiveDiff;
