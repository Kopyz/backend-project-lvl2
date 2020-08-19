import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';
import process from 'process';
import _ from 'lodash';

const makeAbsolutePath = (fileName) => {
  const currentDir = process.cwd();
  const absolutePathFile = path.resolve(currentDir, fileName);
  return absolutePathFile;
};

const defineFileFormat = (fileName) => path.extname(fileName);

const readData = (fileName) => {
  const absolutePathFile = makeAbsolutePath(fileName);
  return fs.readFileSync(absolutePathFile, 'ascii');
};

const adjustNumber = (parsedIni) => {
  const keys = Object.keys(parsedIni);
  const result = keys.reduce((acc, key) => {
    const value = parsedIni[key];
    if (_.isObject(value)) {
      acc[key] = adjustNumber(value);
      return acc;
    }
    if (!Number(value) || _.isBoolean(value)) {
      acc[key] = value;
      return acc;
    }
    acc[key] = Number(value);
    return acc;
  }, {});
  return result;
};

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yaml') {
    return yaml.safeLoad(data);
  }
  if (format === '.ini') {
    return adjustNumber(ini.parse(data));
  }
  return null;
};

export { parse, readData, defineFileFormat };
