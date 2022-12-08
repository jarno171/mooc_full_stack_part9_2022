interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number): string | number => {
  const bmi = mass / (height / 100) ** 2

  if (bmi < 18.5) {
    return 'underweight'
  }

  if (bmi < 25) {
    return 'Normal (healthy weight)'
  }

  return 'overweight'
}


try {
  const { height, weight } = parseArguments(process.argv);
  console.log( `Your weight is: ${calculateBmi(height, weight)}`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}