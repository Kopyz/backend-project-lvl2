import _ from 'lodash';

const makeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlainDiff = (rawDiff) => {
  const iter = (nodes, path = '') => {
    const result = _.map(nodes, (node) => {
      const { name, type } = node;
      const newPath = (path === '') ? name : `${path}.${name}`;

      if (type === 'updated') {
        return `Property '${newPath}' was updated. From ${makeValue(node.valueBefore)} to ${makeValue(node.valueAfter)}\n`;
      }
      if (type === 'added') {
        return `Property '${newPath}' was added with value: ${makeValue(node.value)}\n`;
      }
      if (type === 'removed') {
        return `Property '${newPath}' was removed\n`;
      }
      return `${iter(node.children, `${newPath}`)}`;
    });
    return result.join('');
  };
  return iter(rawDiff);
};

export default makePlainDiff;
