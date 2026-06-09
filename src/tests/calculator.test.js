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

// Unit tests for exported functions
const { modulo, power, squareRoot } = require('../calculator');

describe('Calculator module functions', () => {
  test('modulo function', () => {
    expect(modulo(5, 2)).toBe(1);
    expect(modulo(10, 3)).toBe(1);
    expect(modulo(-5, 2)).toBe(-1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow(/Modulo by zero/);
  });

  test('power function', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(2, -1)).toBeCloseTo(0.5);
    expect(power(1.5, 2)).toBeCloseTo(2.25);
  });

  test('squareRoot function', () => {
    expect(squareRoot(16)).toBe(4);
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-4)).toThrow(/Square root of negative number/);
  });
});
