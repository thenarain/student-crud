import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function StudentForm({ onSubmit, initialData = null }) {
  const [form, setForm] = useState(
    initialData || { first_name: "", email: "", age: "", parent_id: "" }
  );

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.first_name || !form.email || !form.age) {
      Swal.fire(
        "Missing Fields",
        "Please fill all mandatory (*) fields.",
        "warning"
      );
      return;
    }

    onSubmit({
      first_name: form.first_name.trim(),
      email: form.email.trim(),
      age: parseInt(form.age, 10),
      parent_id: form.parent_id ? parseInt(form.parent_id, 10) : null,
    });

    setForm({ first_name: "", email: "", age: "", parent_id: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Member Name<span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          name="first_name"
          placeholder="Enter Member Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Member Email<span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter Member Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Member Age<span className="text-danger">*</span>
        </label>
        <input
          type="number"
          className="form-control"
          name="age"
          placeholder="Enter Member Age"
          value={form.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Member Parent ID</label>
        <input
          type="number"
          className="form-control"
          name="parent_id"
          placeholder="Enter Parent ID (optional)"
          value={form.parent_id}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success px-4">
          Submit
        </button>
      </div>
    </form>
  );
}
