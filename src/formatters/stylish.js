import _ from 'lodash';
import generateRecursiveDiff from '../comparator';

const makeGap = (iterations) => '  '.repeat(iterations);

const printValue = (value, gap) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    let result = '{\n';
    keys.forEach((key) => {
      result = `${result}${makeGap(gap + 2)}${key}: ${value[key]}\n`;
    });
    result = `${result}${makeGap(gap + 1)}}`;
    return result;
  }
  return value;
};

const makeStylishDiff = (data, level = 1) => {
  const result = data.reduce((acc, node) => {
    const { name, type } = node;
    let outputLine = acc;
    if (type === 'add') {
      outputLine = `${outputLine}${makeGap(level)}+ ${name}: ${printValue(node.valueAfter, level)}\n`;
    }
    if (type === 'remove') {
      outputLine = `${outputLine}${makeGap(level)}- ${name}: ${printValue(node.valueBefore, level)}\n`;
    }
    if (type === 'unchange') {
      outputLine = `${outputLine}${makeGap(level)}  ${name}: ${printValue(node.valueAfter, level)}\n`;
    }
    if (type === 'update') {
      outputLine = `${outputLine}${makeGap(level)}+ ${name}: ${printValue(node.valueAfter, level)}\n`;
      outputLine = `${outputLine}${makeGap(level)}- ${name}: ${printValue(node.valueBefore, level)}\n`;
    }
    if (type === 'branch') {
      outputLine = `${outputLine}${makeGap(level)}  ${name}: {\n${makeStylishDiff(node.children, level + 2)}${makeGap(level + 1)}}\n`;
    }
    return outputLine;
  }, '');
  return result;
};

const stylish = (filePath1, filePath2) => {
  const diff = generateRecursiveDiff(filePath1, filePath2);
  return `{\n${makeStylishDiff(diff)}\n}`;
};

export default stylish;
