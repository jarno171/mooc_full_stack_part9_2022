import { CoursePart } from '../utils/interfaces'

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <h2>{course.name} {course.exerciseCount}</h2>
          <p><i>{course.description}</i></p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h2>{course.name} {course.exerciseCount}</h2>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h2>{course.name} {course.exerciseCount}</h2>
          <p><i>{course.description}</i></p>
          <p>submit to {course.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{course.name} {course.exerciseCount}</h2>
          <p><i>{course.description}</i></p>
          <p>required skills {course.requirements.toString()}</p>
        </div>
      );
    default:
      return assertNever(course);
  }
}

export default Part