const printDiff = (data) => {
  console.log('{');
  data.forEach((current) => {
    if (current[0] === '+' || current[0] === '-') {
      console.log(`  ${current}`);
    } else {
      console.log(`    ${current}`);
    }
  });
  console.log('}');
};

export default printDiff;
