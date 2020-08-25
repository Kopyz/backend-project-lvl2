import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

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

const parse = (data, dataFormat) => {
  if (dataFormat === 'json') {
    return JSON.parse(data);
  }
  if (dataFormat === 'yaml') {
    return yaml.safeLoad(data);
  }
  if (dataFormat === 'ini') {
    return adjustNumber(ini.parse(data));
  }
  throw new Error(`Unknown file extension: ${dataFormat}`);
};

export default parse;
