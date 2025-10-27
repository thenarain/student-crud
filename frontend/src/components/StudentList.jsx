import { useEffect, useState, useCallback } from "react";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../services/api";
import StudentForm from "./StudentForm";
import Pagination from "./Pagination";
export default function StudentList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getStudents({ page, limit, search });
      setRows(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch {
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (payload) => {
    try {
      await createStudent(payload);
      Swal.fire("Success", "Student added successfully", "success");
      fetchData();
    } catch {
      Swal.fire("Error", "Failed to add student", "error");
    }
  };

  const handleDelete = async (student) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "If you delete this Member then this action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
    });
    if (result.isConfirmed) {
      try {
        await deleteStudent(student.id);
        Swal.fire("Deleted!", "Member has been deleted.", "success");
        fetchData();
      } catch {
        Swal.fire("Error", "Failed to delete student", "error");
      }
    }
  };

  const handleEdit = (member) => {
    setEditData(member);
    const modal = new bootstrap.Modal(
      document.getElementById("editStudentModal")
    );
    modal.show();
  };

  const handleUpdate = async (payload) => {
    try {
      await updateStudent(editData.id, payload);
      Swal.fire({
        title: "Updated!",
        text: "Member updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchData();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("editStudentModal")
      );
      modal.hide();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update member.", "error");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-dark mb-0">All Members</h4>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addStudentModal"
        >
          <i className="bi bi-person-plus-fill me-2"></i>
          Add New Member
        </button>
      </div>

      <div className="mb-3">
        <input
          className="form-control w-25"
          placeholder="QA"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Enrollment No</th>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Member Age</th>
            <th>Parent ID</th>
            <th style={{ width: "100px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.enrollment_no}</td>
                <td>{r.first_name}</td>
                <td>{r.email}</td>
                <td>{r.age}</td>
                <td>{r.parent_id || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(r)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(r)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <label className="me-2 text-muted">Show</label>
          <select
            className="form-select d-inline-block w-auto"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="ms-2 text-muted">entries</span>
        </div>
        <small className="text-muted">Total records: {rows.length}</small>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-muted">
          Showing page {page} of {totalPages}
        </small>
        <Pagination current={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <div
        className="modal fade"
        id="addStudentModal"
        tabIndex="-1"
        aria-labelledby="addStudentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content shadow-sm border-0">
            <div className="modal-header bg-light border-0">
              <h5
                className="modal-title fw-semibold text-dark"
                id="addStudentModalLabel"
              >
                Add New Member
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-4 pb-4 pt-2">
              <StudentForm onSubmit={handleCreate} />
            </div>
          </div>
        </div>
      </div>
      {/* Edit Member Modal */}
      <div
        className="modal fade"
        id="editStudentModal"
        tabIndex="-1"
        aria-labelledby="editStudentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content shadow-sm border-0">
            <div className="modal-header bg-light border-0">
              <h5
                className="modal-title fw-semibold text-dark"
                id="editStudentModalLabel"
              >
                Edit Member
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-4 pb-4 pt-2">
              {editData && (
                <StudentForm onSubmit={handleUpdate} initialData={editData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
