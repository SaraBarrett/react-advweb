import { useState } from "react";
import "./LearningForm.css";

function LearningForm() {
  // State to store form data (framework, level, start year)
  const [formData, setFormData] = useState({
    framework: "",
    level: "beginner", // beginner / intermediate / advanced
    since: "",         // year when started learning
  });

  // State to store validation errors for each field
  const [errors, setErrors] = useState({});
  // State to track if the form was successfully submitted
  const [submitted, setSubmitted] = useState(false);

  // Handle change for any input or select
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding field in formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Simple validation function
  const validate = () => {
    const newErrors = {};

    // Framework name is required
    if (!formData.framework.trim()) {
      newErrors.framework = "Framework is required.";
    }

    // Validate "since" as a valid year
    const year = parseInt(formData.since);
    if (!formData.since || !year || year < 1990 || year > new Date().getFullYear()) {
      newErrors.since = "Please enter a valid year.";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do not submit if validation fails
    if (!validate()) return;

    // In a real app, you would:
    // - send formData to a backend API
    // - or store the learning record in localStorage / mock API
    console.log("Learning record created:", formData);

    // Mark the form as submitted to show success message
    setSubmitted(true);
  };

  return (
    <div>
      <h3>React Forms: Learning Framework</h3>

      {submitted ? (
        <div className="success-message">
          <p>
            📚 New learning record:
            <br />
            <strong>Framework:</strong> {formData.framework}
            <br />
            <strong>Level:</strong> {formData.level}
            <br />
            <strong>Since:</strong> {formData.since}
          </p>
          <button onClick={() => setSubmitted(false)}>Edit</button>
        </div>
      ) : (
        <form className="learning-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="framework">Framework</label>
            <input
              type="text"
              id="framework"
              name="framework"
              value={formData.framework}
              onChange={handleChange}
              placeholder="e.g. React, Vue, Angular"
              aria-invalid={!!errors.framework}
            />
            {errors.framework && <span className="error">{errors.framework}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="level">Level</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="since">Started learning (year)</label>
            <input
              type="number"
              id="since"
              name="since"
              value={formData.since}
              onChange={handleChange}
              placeholder="e.g. 2024"
              aria-invalid={!!errors.since}
            />
            {errors.since && <span className="error">{errors.since}</span>}
          </div>

          <button type="submit">Insert learning</button>
        </form>
      )}
    </div>
  );
}

export default LearningForm;