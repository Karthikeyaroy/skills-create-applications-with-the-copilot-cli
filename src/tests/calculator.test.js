const assert = require('assert');
const { execSync } = require('child_process');

function run(op, a, b) {
  return execSync(`node src/calculator.js ${op} ${a} ${b}`, { encoding: 'utf8' }).trim();
}

try {
  assert.strictEqual(run('add', 2, 3), '5');
  assert.strictEqual(run('sub', 10, 4), '6');
  assert.strictEqual(run('mul', 45, 2), '90');
  assert.strictEqual(run('div', 20, 5), '4');
  console.log('All calculator tests passed');
} catch (err) {
  console.error('Test failed:', err.message);
  process.exit(1);
}
