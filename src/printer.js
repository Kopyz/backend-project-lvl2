import _ from 'lodash';

const printDiff = (data) => {
  console.log('{');
  data.forEach((current) => {
    if (current[0] === '+' || current[0] === '-') {
      console.log(`  ${current}`);
    } else {
      console.log(`    ${current}`);
    }
  });
  console.log('}');
};

const stylish = (tree, level = 1) => {
  const keys = Object.keys(tree);
  const whitespaces = '  ';
  keys.map((key) => {
    if (_.isObject(tree[key])) {
      console.log(`${whitespaces.repeat(level)}${key}: {`);
      return printRecursiveDiff(tree[key], level + 2);
    }
    console.log(`${whitespaces.repeat(level)}${key}: ${tree[key]}`);
    return undefined;
  });
  if (level !== 1) {
    console.log(`${whitespaces.repeat(level - 1)}}`);
  }
  return undefined;
};

export { printDiff, stylish };
