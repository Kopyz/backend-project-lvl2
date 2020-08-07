import _ from 'lodash';
import parse from './parsers';

const checkKeyPresence = (tree, key) => Object.prototype.hasOwnProperty.call(tree, key);

const generateRecursiveDiff = (tree1, tree2) => {
  const data1 = parse(tree1);
  const data2 = parse(tree2);

  const iter = (file1, file2) => {
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const allKeys = _.union(keys1, keys2);

    return allKeys.reduce((acc, key) => {
      const value1 = file1[key];
      const value2 = file2[key];
      const currentNode = {};
      currentNode.name = key;

      if (!_.isObject(value1) && checkKeyPresence(file1, key)
        && checkKeyPresence(file2, key) && _.isObject(value2)) {
        currentNode.type = 'update';
        currentNode['current value'] = iter(value2, value2);
        currentNode['previous value'] = value1;
        acc.push(currentNode);
        return acc;
      }

      if (_.isObject(value1) && checkKeyPresence(file1, key)
        && checkKeyPresence(file2, key) && !_.isObject(value2)) {
        currentNode.type = 'update';
        currentNode['current value'] = value2;
        currentNode['previous value'] = iter(value1, value1);
        acc.push(currentNode);
        return acc;
      }

      if (_.isObject(value1) && checkKeyPresence(file1, key)
        && checkKeyPresence(file2, key)) {
        currentNode.type = 'unchange';
        currentNode['current value'] = iter(value1, value2);
        acc.push(currentNode);
        return acc;
      }

      if (_.isObject(value1) && checkKeyPresence(file1, key)
        && !checkKeyPresence(file2, key)) {
        currentNode.type = 'remove';
        currentNode['previous value'] = iter(value1, value1);
        acc.push(currentNode);
        return acc;
      }

      if (_.isObject(value2) && !checkKeyPresence(file1, key) && checkKeyPresence(file2, key)) {
        currentNode.type = 'add';
        currentNode['current value'] = iter(value2, value2);
        acc.push(currentNode);
        return acc;
      }

      if (value2 === value1) {
        currentNode.type = 'unchange';
        currentNode['current value'] = value1;
      } else if (!checkKeyPresence(file1, key)) {
        currentNode.type = 'add';
        currentNode['current value'] = value2;
      } else if (!checkKeyPresence(file2, key)) {
        currentNode.type = 'remove';
        currentNode['previous value'] = value1;
      } else if (value2 !== value1) {
        currentNode.type = 'update';
        currentNode['current value'] = value2;
        currentNode['previous value'] = value1;
      }

      acc.push(currentNode);
      return acc;
    }, []);
  };
  return iter(data1, data2);
};

export default generateRecursiveDiff;
