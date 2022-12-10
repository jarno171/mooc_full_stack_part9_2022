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
  };
};

interface input {
  targetAverage: number
  exerciseHours: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseArgumentsArray = (args: any): input => {
  if (!args) {
    throw new Error('no arguments');
  }

  if (!args.daily_exercises || !args.target) {
    throw new Error('some arguments missing');
  }

  const targetAverage = Number(args.target);

  if (isNaN(targetAverage)) {
    throw new Error('Provided target average is not a number!');
  }

  let inputArray = [];

  if (!isNaN(Number(args.daily_exercises))) {
    inputArray.push(Number(args.daily_exercises));
  } else {
    for (let i = 0; i < args.daily_exercises.length; ++i) {
      if (!isNaN(Number(args.daily_exercises[i]))) {
        inputArray.push(Number(args.daily_exercises[i]));
      } else {
        throw new Error('provided values for exercise hours were not numbers!');
      }
    }
  }

  return {
    targetAverage: targetAverage,
    exerciseHours: inputArray
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateExercisesWrapper = (args: any) => {
  try {
    const inputArray = parseArgumentsArray(args);
    return  {
      success: true,
      results: calculateExercises(inputArray.exerciseHours, inputArray.targetAverage)
    };
  } catch (error: unknown) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return {
      success: false,
      message: errorMessage
    };
  }
};