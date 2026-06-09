#!/usr/bin/env node

// CLI Calculator
// Supported operations:
//  - add (or +)
//  - subtract (or -)
//  - multiply (or *)
//  - divide (or /)

const readline = require('readline');

function usage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide (symbols + - * / accepted)');
  console.log('Example: node src/calculator.js add 2 3');
}

function parseNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return n;
}

function calculate(op, a, b) {
  // Only the four basic operations are supported: add, subtract, multiply, divide
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'subtract':
    case '-':
      return a - b;
    case 'multiply':
    case '*':
    case 'x':
    case 'X':
      return a * b;
    case 'divide':
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function runWithArgs(argv) {
  if (argv.length < 3) {
    usage();
    process.exitCode = 1;
    return;
  }

  const op = argv[0];
  try {
    const a = parseNumber(argv[1]);
    const b = parseNumber(argv[2]);
    const result = calculate(op, a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
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
      const op = (await question('Operation (add, subtract, multiply, divide or + - * /): ')).trim();
      const aStr = (await question('First number: ')).trim();
      const bStr = (await question('Second number: ')).trim();
      const a = parseNumber(aStr);
      const b = parseNumber(bStr);
      const result = calculate(op, a, b);
      console.log('Result:', result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = 1;
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
