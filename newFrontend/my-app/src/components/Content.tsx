import { Courses } from '../utils/interfaces'

const Content = ({ courseParts }: { courseParts: Courses }) => {

  return (
    <>
      <p>
        {courseParts.courses[0].name} {courseParts.courses[0].exerciseCount}
      </p>
      <p>
        {courseParts.courses[1].name} {courseParts.courses[1].exerciseCount}
      </p>
      <p>
        {courseParts.courses[2].name} {courseParts.courses[2].exerciseCount}
      </p>
    </>
  )
}

export default Content