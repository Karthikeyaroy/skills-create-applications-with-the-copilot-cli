const { execSync, spawnSync } = require('child_process');

describe('Calculator CLI', () => {
  test('basic operations', () => {
    expect(execSync('node src/calculator.js add 2 3', { encoding: 'utf8' }).trim()).toBe('5');
    expect(execSync('node src/calculator.js sub 10 4', { encoding: 'utf8' }).trim()).toBe('6');
    expect(execSync('node src/calculator.js mul 45 2', { encoding: 'utf8' }).trim()).toBe('90');
    expect(execSync('node src/calculator.js div 20 5', { encoding: 'utf8' }).trim()).toBe('4');
  });

  test('extended operations', () => {
    expect(execSync('node src/calculator.js mod 5 2', { encoding: 'utf8' }).trim()).toBe('1');
    expect(execSync('node src/calculator.js pow 2 3', { encoding: 'utf8' }).trim()).toBe('8');
    expect(execSync('node src/calculator.js sqrt 16', { encoding: 'utf8' }).trim()).toBe('4');
  });

  test('edge cases', () => {
    const modZero = spawnSync('node', ['src/calculator.js', 'mod', '5', '0'], { encoding: 'utf8' });
    expect(modZero.status).not.toBe(0);
    expect(modZero.stderr).toMatch(/Modulo by zero/);

    const sqrtNeg = spawnSync('node', ['src/calculator.js', 'sqrt', '-9'], { encoding: 'utf8' });
    expect(sqrtNeg.status).not.toBe(0);
    expect(sqrtNeg.stderr).toMatch(/Square root of negative number/);
  });
});
