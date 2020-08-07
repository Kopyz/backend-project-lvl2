import _ from 'lodash';
import getFixturePath from '../pathMaker';

const fs = require('fs');

const resultFilePath = getFixturePath('result');

const selector = (type) => {
  switch (type) {
    case 'add': return ['+', 'current value'];
    case 'remove': return ['-', 'previous value'];
    case 'unchange': return [' ', 'current value'];
    default: return ['+-', 'c'];
  }
};

const printDiffTree = (data, level = 1) => {
  data.map((node) => {
    const { name, type } = node;
    const whitespaces = '  ';
    const currentValue = node['current value'];
    const previousValue = node['previous value'];
    const [prefix, valueSelector] = selector(type);
    const value = node[valueSelector];

    if (type === 'update') {
      fs.appendFileSync(resultFilePath, `\n${whitespaces.repeat(level)}+ ${name}: `);

      if (_.isArray(currentValue)) {
        fs.appendFileSync(resultFilePath, '{');
        printDiffTree(currentValue, level + 2);

        fs.appendFileSync(resultFilePath, `\n${whitespaces.repeat(level + 1)}}`);
      } else {
        fs.appendFileSync(resultFilePath, `${currentValue}`);
      }

      fs.appendFileSync(resultFilePath, `\n${whitespaces.repeat(level)}- ${name}: `);

      if (_.isArray(previousValue)) {
        fs.appendFileSync(resultFilePath, '{');
        printDiffTree(previousValue, level + 2);

        fs.appendFileSync(resultFilePath, `\n${whitespaces.repeat(level + 1)}}`);
      } else {
        fs.appendFileSync(resultFilePath, `${previousValue}`);
      }
    } else {
      fs.appendFileSync(resultFilePath, `\n${whitespaces.repeat(level)}${prefix} ${name}: `);

      if (_.isArray(value)) {
        fs.appendFileSync(resultFilePath, '{');
        printDiffTree(value, level + 2);
        fs.appendFileSync(resultFilePath, `\n${whitespaces.repeat(level + 1)}}`);
      } else {
        fs.appendFileSync(resultFilePath, `${value}`);
      }
    }
    return undefined;
  });
};

const stylish = (tree) => {
  fs.writeFileSync(resultFilePath, '{');
  printDiffTree(tree);
  fs.appendFileSync(resultFilePath, '\n}');
  console.log(fs.readFileSync(resultFilePath, 'ascii'));
};

export default stylish;
