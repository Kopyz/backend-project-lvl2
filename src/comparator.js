import _ from 'lodash';

const generateRecursiveDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys1, keys2);

  return allKeys.map((key) => {
    const currentNode = {};
    currentNode.name = key;

    if (!_.has(data2, key)) {
      currentNode.type = 'removed';
      currentNode.value = data1[key];
    } else if (!_.has(data1, key)) {
      currentNode.type = 'added';
      currentNode.value = data2[key];
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      currentNode.type = 'nested';
      currentNode.children = generateRecursiveDiff(data1[key], data2[key]);
    } else if (data1[key] === data2[key]) {
      currentNode.type = 'unchanged';
      currentNode.value = data2[key];
    } else {
      currentNode.type = 'updated';
      currentNode.valueAfter = data2[key];
      currentNode.valueBefore = data1[key];
    }
    return currentNode;
  });
};

export default generateRecursiveDiff;
