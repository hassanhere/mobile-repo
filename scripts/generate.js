#!/usr/bin/env node

const [, , type, ...args] = process.argv;

if (!type) {
  console.log(`
Usage:
yarn generate component NewComponent
yarn generate screen auth TermsAndConditions
  `);
  process.exit(1);
}

if (type === 'component') {
  require('./generators/component')(args);
  return;
}

if (type === 'screen') {
  require('./generators/screen')(args);
  return;
}

console.log('Invalid generator type.');
process.exit(1);
