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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));