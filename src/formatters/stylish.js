import _ from 'lodash';

const makeGap = (iterations) => '  '.repeat(iterations);

const printValue = (value, gap) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const result = keys.map((key) => `${makeGap(gap + 3)}${key}: ${value[key]}\n`);
    return ['{\n', ...result, `${makeGap(gap + 1)}}`].join('');
  }
  return value;
};

const makeStylishDiff = (rawDiff) => {
  const iter = (data, level = 1) => {
    const result = _.map(data, (node) => {
      const { name, type } = node;
      if (type === 'add') {
        return `${makeGap(level)}+ ${name}: ${printValue(node.valueAfter, level)}\n`;
      }
      if (type === 'remove') {
        return `${makeGap(level)}- ${name}: ${printValue(node.valueBefore, level)}\n`;
      }
      if (type === 'unchange') {
        return `${makeGap(level)}  ${name}: ${printValue(node.valueAfter, level)}\n`;
      }
      if (type === 'update') {
        return `${makeGap(level)}+ ${name}: ${printValue(node.valueAfter, level)}\n${makeGap(level)}- ${name}: ${printValue(node.valueBefore, level)}\n`;
      }
      if (type === 'branch') {
        return `${makeGap(level)}  ${name}: {\n${iter(node.children, level + 2)}${makeGap(level + 1)}}\n`;
      }
      return '';
    });
    return result.join('');
  };
  return `{\n${iter(rawDiff)}}`;
};

export default makeStylishDiff;
