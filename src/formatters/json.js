import getFixturePath from '../pathMaker';

const fs = require('fs');

const resultFilePath = getFixturePath('result');

const makeJsonResult = (tree) => {
  const data = JSON.stringify(tree);
  fs.writeFileSync(resultFilePath, data);
  console.log(fs.readFileSync(resultFilePath, 'ascii'));
};

export default makeJsonResult;
