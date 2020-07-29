import _ from 'lodash';
import getFixturePath from '../pathMaker';

const fs = require('fs');

const resultFilePath = getFixturePath('result');

const makeValue = (tree, key) => {
  if (_.isObject(tree[key])) {
    return '[complex value]';
  }
  if (_.isString(tree[key])) {
    return `'${tree[key]}'`;
  }
  return `${tree[key]}`;
};

const plain = (tree) => {
  fs.writeFileSync(resultFilePath, '');

  const iter = (data, path = '') => {
    const keys = Object.keys(data);
    let outputLine = '';
    const newData = { ...data };
    keys.map((key) => {
      if (newData[key] === undefined) {
        return undefined;
      }

      const [status, name = status] = key.trim().split(' ');

      const newPath = (path === '') ? `${name}` : `${path}.${name}`;


      if (status === '+') {
        if (keys.indexOf(`- ${name}`) !== -1) {
          outputLine = `Property '${newPath}' was updated. From ${makeValue(newData, `- ${name}`)} to ${makeValue(newData, `${key}`)}\n`;
          fs.appendFileSync(resultFilePath, outputLine);
          newData[`- ${name}`] = undefined;
          return undefined;
        }
        outputLine = `Property '${newPath}' was added with value: ${makeValue(newData, `${key}`)}\n`;
        fs.appendFileSync(resultFilePath, outputLine);
        return undefined;
      }
      if (status === '-') {
        if (keys.indexOf(`+ ${name}`) !== -1) {
          outputLine = `Property '${newPath}' was updated. From ${makeValue(newData, `- ${name}`)} to ${makeValue(newData, `+ ${name}`)}\n`;
          fs.appendFileSync(resultFilePath, outputLine);
          newData[`+ ${name}`] = undefined;
          return undefined;
        }
        outputLine = `Property '${newPath}' was removed\n`;
        fs.appendFileSync(resultFilePath, outputLine);
        return undefined;
      }
      if (!_.isObject(newData[key])) {
        return undefined;
      }
      return iter(newData[key], `${newPath}`);
    });
  };
  return iter(tree);
};

export default plain;
