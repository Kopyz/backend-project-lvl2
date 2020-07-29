import _ from 'lodash';
import getFixturePath from '../pathMaker';

const fs = require('fs');

const resultFilePath = getFixturePath('result');

const makeStr = (str) => `\n${str}`;

const printDiffTree = (tree, level = 1) => {
  const keys = Object.keys(tree);
  const whitespaces = '  ';
  keys.map((key) => {
    if (_.isObject(tree[key])) {
      fs.appendFileSync(resultFilePath, makeStr(`${whitespaces.repeat(level)}${key}: {`));
      return printDiffTree(tree[key], level + 2);
    }
    fs.appendFileSync(resultFilePath, makeStr(`${whitespaces.repeat(level)}${key}: ${tree[key]}`));
    return undefined;
  });
  if (level !== 1) {
    fs.appendFileSync(resultFilePath, makeStr(`${whitespaces.repeat(level - 1)}}`));
  }
  return undefined;
};

const stylish = (tree) => {
  fs.writeFileSync(resultFilePath, '{');
  printDiffTree(tree);
  fs.appendFileSync(resultFilePath, makeStr('}'));
  console.log(fs.readFileSync(resultFilePath, 'ascii'));
};

export default stylish;
