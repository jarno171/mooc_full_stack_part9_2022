import { Courses } from '../utils/interfaces'

const Total = ({ courseParts }: { courseParts: Courses }) => {

  return (
    <p>
      Number of exercises{" "}
      {courseParts.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total