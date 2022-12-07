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

console.log(calculateBmi(180, 74))