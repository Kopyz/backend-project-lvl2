import _ from 'lodash';
import generateRecursiveDiff from '../comparator';

const makeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const makePlainDiff = (data) => {
  const iter = (nodes, path = '') => {
    const result = nodes.reduce((acc, node) => {
      const { name, type } = node;
      const newPath = (path === '') ? `${name}` : `${path}.${name}`;
      let outputLine = acc;
      if (type === 'update') {
        outputLine = `${outputLine}Property '${newPath}' was updated. From ${makeValue(node.valueBefore)} to ${makeValue(node.valueAfter)}\n`;
      }
      if (type === 'add') {
        outputLine = `${outputLine}Property '${newPath}' was added with value: ${makeValue(node.valueAfter)}\n`;
      }
      if (type === 'remove') {
        outputLine = `${outputLine}Property '${newPath}' was removed\n`;
      }
      if (type === 'branch') {
        return `${outputLine}${iter(node.children, `${newPath}`)}`;
      }
      return outputLine;
    }, '');
    return result;
  };
  return iter(data);
};

const plain = (filePath1, filePath2) => {
  const diff = generateRecursiveDiff(filePath1, filePath2);
  return makePlainDiff(diff);
};

export default plain;
