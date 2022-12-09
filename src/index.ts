import express = require('express');
const calculateBmi = require('./bmiCalculator')

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!!');
});

app.get('/bmi', (req, res) => {
  const bmiAnalysis = calculateBmi(req.query.height, req.query.weight)

  if (bmiAnalysis.success) {
    res.status(201).json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmiAnalysis.message
    })
  } else {
    res.status(400).json({
      bmi: bmiAnalysis.message
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});