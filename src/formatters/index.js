import stylish from './stylish.js';
import plain from './plain';

export default (format) => {
  if (format === 'plain') {
    return plain;
  }
  if (format === 'stylish') {
    return stylish;
  }
  return console.log('Unknown format');
};
