import _ from 'lodash';
import getFixturePath from '../pathMaker';

const fs = require('fs');

const resultFilePath = getFixturePath('result');

const makeValue = (value) => {
  if (_.isArray(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const makePlainDiff = (tree) => {
  const iter = (data, path = '') => {
    data.map((node) => {
      const { name, type } = node;
      const currentValue = node['current value'];
      const previousValue = node['previous value'];
      const newPath = (path === '') ? `${name}` : `${path}.${name}`;
      let outputLine = '';
      if (type === 'update') {
        outputLine = `Property '${newPath}' was updated. From ${makeValue(previousValue)} to ${makeValue(currentValue)}\n`;
        fs.appendFileSync(resultFilePath, outputLine);
        return undefined;
      }
      if (type === 'add') {
        outputLine = `Property '${newPath}' was added with value: ${makeValue(currentValue)}\n`;
        fs.appendFileSync(resultFilePath, outputLine);
        return undefined;
      }
      if (type === 'remove') {
        outputLine = `Property '${newPath}' was removed\n`;
        fs.appendFileSync(resultFilePath, outputLine);
        return undefined;
      }
      if (!_.isArray(currentValue)) {
        return undefined;
      }
      return iter(currentValue, `${newPath}`);
    });
  };
  return iter(tree);
};

const plain = (tree) => {
  fs.writeFileSync(resultFilePath, '');
  makePlainDiff(tree);
  console.log(fs.readFileSync(resultFilePath, 'ascii'));
};

export default plain;
