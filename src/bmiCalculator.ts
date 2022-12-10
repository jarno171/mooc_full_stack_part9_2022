const checkArguments = (height: number, weight: number): boolean => {

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return true;
  } else {
    return false;
  }
};

const calculateBmi = (height: number, mass: number): string | number => {
  const bmi = mass / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'underweight';
  }

  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }

  return 'overweight';
}

export const calculateBmiWrapper = (height: number, weight: number) => {

  try {

    if(!height || !weight) {
      throw new Error('missing parameter');
    }

    if (!checkArguments(height, weight)) {
      throw new Error('provided values were not numbers');
    }

    return {
      success: true,
      message: calculateBmi(height, weight)
    };
  } catch (error: unknown) {
    let errorMessage = '';

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};