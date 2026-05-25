
import "./CourseCover.css";

function CourseCover({ courseName, professor, students, masterProgram }) {
  return (
    <section className="course-cover">
      <h1 className="course-cover__title">{courseName}</h1>

      <p className="course-cover__text">
        <strong>Professor:</strong> {professor}
      </p>

      <p className="course-cover__text">
        <strong>Students:</strong>
      </p>

      {students.map((student, index) => (
        <p key={index} className="course-cover__student">
          {student}
        </p>
      ))}

      <p className="course-cover__text">
        <strong>Master’s Program:</strong> {masterProgram}
      </p>
    </section>
  );
}

export default CourseCover;