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

      if (type === 'update') {
        return `Property '${newPath}' was updated. From ${makeValue(node.valueBefore)} to ${makeValue(node.valueAfter)}\n`;
      }
      if (type === 'add') {
        return `Property '${newPath}' was added with value: ${makeValue(node.valueAfter)}\n`;
      }
      if (type === 'remove') {
        return `Property '${newPath}' was removed\n`;
      }
      if (type === 'branch') {
        return `${iter(node.children, `${newPath}`)}`;
      }
      return '';
    });
    return result.join('');
  };
  return iter(rawDiff);
};

export default makePlainDiff;
