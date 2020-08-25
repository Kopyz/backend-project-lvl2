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

const getDataFormat = (fileName) => path.extname(fileName).slice(1);

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = readData(filePath1);
  const data2 = readData(filePath2);
  const dataFormat1 = getDataFormat(filePath1);
  const dataFormat2 = getDataFormat(filePath2);
  const parsedData1 = parse(data1, dataFormat1);
  const parsedData2 = parse(data2, dataFormat2);
  const rawDiff = generateDiff(parsedData1, parsedData2);

  return getFormattedDiff(outputFormat)(rawDiff);
};
