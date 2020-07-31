import _ from 'lodash';
import getFixturePath from '../pathMaker';

const fs = require('fs');

const resultFilePath = getFixturePath('result');

const removeExtraSpace = (tree) => {
  const keys = Object.keys(tree);
  return keys.reduce((acc, key) => {
    if (_.isObject(tree[key])) {
      acc[key.trim()] = removeExtraSpace(tree[key]);
      return acc;
    }
    acc[key.trim()] = tree[key];
    return acc;
  }, {});
};

const makeJsonResult = (tree) => {
  const data = JSON.stringify(removeExtraSpace(tree));
  fs.writeFileSync(resultFilePath, data);
};

export default makeJsonResult;
