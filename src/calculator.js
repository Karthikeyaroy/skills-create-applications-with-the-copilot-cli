#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations (based on the provided image and repo issue):
//  - add : addition (num1 + num2)
//  - sub : subtraction (num1 - num2)
//  - mul : multiplication (num1 * num2)
//  - div : division (num1 / num2)
// The calculator accepts positional args and prints a plain numeric result to stdout.

const readline = require('readline');

function usage() {
  console.log('Usage: node calculator.js <operation> <num1> <num2>');
  console.log('Operations: add (+), sub (-), mul (*), div (/), mod (%), pow (^ or **), sqrt (unary)');
  console.log('Examples: node calculator.js add 2 3    # => 5');
  console.log('          node calculator.js sqrt 9     # => 3');
}

function parseNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return n;
}

function calculate(op, a, b) {
  // Support basic operations plus mod, pow, and sqrt (sqrt is unary)
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
    case 'x':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) {
        const e = new Error('Division by zero');
        e.code = 2; // divide-by-zero specific exit code
        throw e;
      }
      return a / b;
    case 'mod':
    case '%':
      if (b === 0) {
        const e = new Error('Modulo by zero');
        e.code = 2;
        throw e;
      }
      return a % b;
    case 'pow':
    case '^':
    case '**':
      return Math.pow(a, b);
    case 'sqrt':
      if (typeof a !== 'number') {
        throw new Error('Invalid number for square root');
      }
      if (a < 0) {
        const e = new Error('Square root of negative number');
        e.code = 3; // custom exit code for invalid sqrt
        throw e;
      }
      return Math.sqrt(a);
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function runWithArgs(argv) {
  const op = argv[0];

  // unary sqrt: expect 1 numeric argument
  if (op === 'sqrt') {
    if (argv.length < 2) {
      usage();
      process.exitCode = 1;
      return;
    }
    try {
      const a = parseNumber(argv[1]);
      const result = calculate(op, a);
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = err.code || 1;
    }
    return;
  }

  if (argv.length < 3) {
    usage();
    process.exitCode = 1;
    return;
  }

  try {
    const a = parseNumber(argv[1]);
    const b = parseNumber(argv[2]);
    const result = calculate(op, a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    // Use provided error code when available, otherwise default to 1
    process.exitCode = err.code || 1;
  }
}

function promptInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q) => new Promise((res) => rl.question(q, res));

  (async () => {
    try {
      const op = (await question('Operation (add, sub, mul, div, mod, pow, sqrt or + - * / % ^): ')).trim();
      if (op === 'sqrt') {
        const aStr = (await question('Number: ')).trim();
        const a = parseNumber(aStr);
        const result = calculate(op, a);
        console.log('Result:', result);
      } else {
        const aStr = (await question('First number: ')).trim();
        const bStr = (await question('Second number: ')).trim();
        const a = parseNumber(aStr);
        const b = parseNumber(bStr);
        const result = calculate(op, a, b);
        console.log('Result:', result);
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = err.code || 1;
    } finally {
      rl.close();
    }
  })();
}

// Entry point
(function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    if (args.length === 0) {
      // interactive mode when no args provided
      promptInteractive();
    } else {
      usage();
    }
    return;
  }

  // positional args: operation num1 num2
  runWithArgs(args);
})();
