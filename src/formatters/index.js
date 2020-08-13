import stylish from './stylish.js';
import plain from './plain';
import json from './json';

export default (format) => {
  if (format === 'plain') {
    return plain;
  }
  if (format === 'stylish') {
    return stylish;
  }
  if (format === 'json') {
    return json;
  }
  throw new Error('Unknown format');
};
