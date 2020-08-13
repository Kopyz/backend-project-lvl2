import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as ini from 'ini';
import * as process from 'process';

const makeAbsolutePath = (fileName) => {
  const currentDir = process.cwd();
  const absolutePathFile = path.resolve(currentDir, fileName);
  return absolutePathFile;
};

const defineFileFormat = (fileName) => path.extname(fileName);

const parse = (fileName) => {
  const format = defineFileFormat(fileName);
  const absolutePathFile = makeAbsolutePath(fileName);

  if (format === '.json') {
    return JSON.parse(fs.readFileSync(absolutePathFile, 'ascii'));
  }
  if (format === '.yaml') {
    return yaml.safeLoad(fs.readFileSync(absolutePathFile, 'ascii'));
  }
  if (format === '.ini') {
    return ini.parse(fs.readFileSync(absolutePathFile, 'ascii'));
  }
  return null;
};

export default parse;
