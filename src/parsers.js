const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const process = require('process');

const parse = (file) => {
  const format = path.extname(file);
  const currentDir = process.cwd();
  const absolutePathFile = path.resolve(currentDir, file);

  if (format === '.json') {
    return JSON.parse(fs.readFileSync(absolutePathFile, 'ascii'));
  }
  if (format === '.yml') {
    return yaml.safeLoad(fs.readFileSync(absolutePathFile, 'ascii'));
  }
  return null;
};

export default parse;
