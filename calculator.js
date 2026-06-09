#!/usr/bin/env node
// Simple Node.js CLI calculator
// Usage: node calculator.js <operation> <num1> <num2>

const args = process.argv.slice(2);

function printHelp() {
  console.log(`Usage: node calculator.js <operation> <num1> <num2>

Operations:
  add       Add two numbers
  subtract  Subtract second number from first
  multiply  Multiply two numbers
  divide    Divide first number by second

Examples:
  node calculator.js add 2 3    # => 5
  node calculator.js subtract 5 2  # => 3
  node calculator.js multiply 3 4  # => 12
  node calculator.js divide 10 2   # => 5
`);
}

function isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
}

function parseNum(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function calculate(op, a, b) {
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
      return a * b;
    case 'divide':
    case '/':
      if (b === 0) return { error: 'Division by zero' };
      return a / b;
    default:
      return { error: `Unknown operation: ${op}` };
  }
}

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  // interactive prompt when no args
  if (args.length === 0) {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Operation (add, subtract, multiply, divide): ', (op) => {
      rl.question('First number: ', (s1) => {
        rl.question('Second number: ', (s2) => {
          const a = parseNum(s1);
          const b = parseNum(s2);
          if (!isNumber(a) || !isNumber(b)) {
            console.error('Invalid number input');
            rl.close();
            process.exit(1);
          }
          const result = calculate(op, a, b);
          if (result && result.error) {
            console.error(result.error);
            rl.close();
            process.exit(1);
          }
          console.log(result);
          rl.close();
        });
      });
    });
  } else {
    printHelp();
    process.exit(0);
  }
} else {
  if (args.length < 3) {
    console.error('Error: expected 3 arguments: <operation> <num1> <num2>');
    printHelp();
    process.exit(1);
  }
  const [op, s1, s2] = args;
  const a = parseNum(s1);
  const b = parseNum(s2);
  if (!isNumber(a) || !isNumber(b)) {
    console.error('Error: both num1 and num2 must be valid numbers');
    process.exit(1);
  }
  const result = calculate(op, a, b);
  if (result && result.error) {
    console.error('Error:', result.error);
    if (result.error === 'Division by zero') process.exit(2);
    process.exit(1);
  }
  console.log(result);
}
