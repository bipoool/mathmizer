// Generate random numbers based on difficulty
const generateNumber = (difficulty) => {
  switch (difficulty) {
    case 'easy': {
      // Rounded numbers like 10, 20, 100, 200, 1000, etc.
      const bases = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const powers = [1, 10, 100, 1000];
      const base = bases[Math.floor(Math.random() * bases.length)];
      const power = powers[Math.floor(Math.random() * powers.length)];
      return base * power;
    }
    case 'medium': {
      // Any whole number between 1 and 999
      return Math.floor(Math.random() * 999) + 1;
    }
    case 'hard': {
      // Numbers with up to 2 decimal places
      const num = Math.random() * 999 + 1;
      return Math.round(num * 100) / 100;
    }
    default:
      return 1;
  }
};

// Generate operation
const generateOperation = () => {
  const operations = ['+', '-', '*', '/', '%'];
  return operations[Math.floor(Math.random() * operations.length)];
};

// Calculate result based on operation
const calculate = (a, b, operation) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : a; // Avoid division by zero
    case '%':
      return b !== 0 ? (a * b) / 100 : 0; // Percentage: a% of b
    default:
      return a + b;
  }
};

// Format number for display
const formatNumber = (num, difficulty) => {
  if (difficulty === 'hard' && num % 1 !== 0) {
    return num.toFixed(2);
  }
  return num.toString();
};

// Get operation display name
const getOperationDisplay = (operations) => {
  const operationNames = {
    '+': 'Addition',
    '-': 'Subtraction',
    '*': 'Multiplication',
    '/': 'Division',
    '%': 'Percentage'
  };
  
  const uniqueOps = [...new Set(operations)];
  if (uniqueOps.length === 1) {
    return operationNames[uniqueOps[0]];
  }
  return 'Mixed Operations';
};

// Generate a complete problem
export const generateProblem = (difficulty, numberCount) => {
  const numbers = [];
  const operations = [];
  
  // Generate numbers
  for (let i = 0; i < numberCount; i++) {
    numbers.push(generateNumber(difficulty));
  }
  
  // Generate operations (one less than numbers)
  for (let i = 0; i < numberCount - 1; i++) {
    operations.push(generateOperation());
  }
  
  // Build display string and calculate answer
  let display = formatNumber(numbers[0], difficulty);
  let result = numbers[0];
  
  // Process operations left to right (simple calculator logic)
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    const nextNumber = numbers[i + 1];
    
    // Special handling for percentage
    if (operation === '%') {
      display += ` × ${formatNumber(nextNumber, difficulty)}%`;
      result = (result * nextNumber) / 100;
    } else {
      display += ` ${operation} ${formatNumber(nextNumber, difficulty)}`;
      result = calculate(result, nextNumber, operation);
    }
  }
  
  // Round the final answer appropriately
  if (difficulty === 'hard') {
    result = Math.round(result * 100) / 100;
  } else if (difficulty === 'medium') {
    result = Math.round(result);
  } else {
    // For easy mode, round to nearest 10 if result is large
    if (Math.abs(result) >= 100) {
      result = Math.round(result / 10) * 10;
    } else {
      result = Math.round(result);
    }
  }
  
  display += ' = ?';
  
  return {
    numbers,
    operations,
    display,
    answer: result,
    operationDisplay: getOperationDisplay(operations)
  };
};

// Generate a practice set
export const generatePracticeSet = (difficulty, numberCount, setSize = 10) => {
  const problems = [];
  for (let i = 0; i < setSize; i++) {
    problems.push(generateProblem(difficulty, numberCount));
  }
  return problems;
};
