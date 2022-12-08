interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exerciseHours: number[], targetAverage: number): Result => {

  const rating = ( average: number, targetAverage: number ) => {
    if (average / targetAverage > 1.2) {
      return { rating: 3, ratingDescription: 'Excellent!' };
    } else if (average / targetAverage > 0.8) {
      return { rating: 2, ratingDescription: 'You did okay' };
    } else {
      return { rating: 1, ratingDescription: ':\'-(' };
    }
  }

  const average = exerciseHours.reduce( ( accumulator, currentValue ) => accumulator + currentValue, 0 ) / exerciseHours.length;

  const trainingDays = exerciseHours.reduce( ( accumulator, currentValue ) => currentValue === 0 ? accumulator : accumulator + 1, 0);

  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays,
    success: average >= targetAverage,
    rating: rating(average, targetAverage).rating,
    ratingDescription: rating(average, targetAverage).ratingDescription,
    target: targetAverage,
    average: average
  }
}

interface input {
  targetAverage: number
  exerciseHours: number[];
}

const parseArgumentsArray = (args: Array<string>): input => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetAverage = Number(args[2]);

  if (isNaN(targetAverage)) {
    throw new Error('Provided target average is not a number!');
  }

  let inputArray = []

  for (let i = 3; i < args.length; ++i) {
    if (!isNaN(Number(args[i]))) {
      inputArray.push(Number(args[i]))
    } else {
      throw new Error('Provided values for exercise hours were not numbers!');
    }
  }

  return {
    targetAverage: targetAverage,
    exerciseHours: inputArray
  }
}

try {
  const inputArray = parseArgumentsArray(process.argv);
  console.log(calculateExercises(inputArray.exerciseHours, inputArray.targetAverage))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));