import express = require('express');
import { calculateBmiWrapper } from './bmiCalculator';
import { calculateExercisesWrapper } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!!');
});

app.get('/bmi', (req, res) => {
  const bmiAnalysis = calculateBmiWrapper(Number(req.query.height), Number(req.query.weight));

  if (bmiAnalysis.success) {
    res.status(201).json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmiAnalysis.message
    })
  } else {
    res.status(400).json({
      error: bmiAnalysis.message
    });
  }
});

app.post('/exercises', (req, res) => {
  const exerciseAnalysis = calculateExercisesWrapper(req.body);
  console.log(exerciseAnalysis);

  if (exerciseAnalysis.success) {
    res.status(201).json(exerciseAnalysis.results);
  } else {
    res.status(400).json({
      error: exerciseAnalysis.message
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});