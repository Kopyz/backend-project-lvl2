import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys1, keys2);

  return allKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { name: key, type: 'removed', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { name: key, type: 'nested', children: generateDiff(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { name: key, type: 'unchanged', value: data2[key] };
    }
    return {
      name: key, type: 'updated', valueAfter: data2[key], valueBefore: data1[key],
    };
  });
};

export default generateDiff;
