import path from 'path';
import fs from 'fs';
import process from 'process';
import parse from './parsers';
import generateDiff from './comparator';
import getFormattedDiff from './formatters/index';

const makeAbsolutePath = (fileName) => {
  const currentDir = process.cwd();
  const absolutePathFile = path.resolve(currentDir, fileName);
  return absolutePathFile;
};

const readData = (fileName) => {
  const absolutePathFile = makeAbsolutePath(fileName);
  return fs.readFileSync(absolutePathFile, 'ascii');
};

const getContentFormat = (fileName) => path.extname(fileName);

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = readData(filePath1);
  const data2 = readData(filePath2);
  const contentFormat1 = getContentFormat(filePath1);
  const contentFormat2 = getContentFormat(filePath2);
  const parsedData1 = parse(data1, contentFormat1);
  const parsedData2 = parse(data2, contentFormat2);
  const rawDiff = generateDiff(parsedData1, parsedData2);

  return getFormattedDiff(outputFormat)(rawDiff);
};
