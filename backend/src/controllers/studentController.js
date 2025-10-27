import StudentModel from "../models/studentModel.js";

const StudentController = {
  async create(req, res) {
    try {
      const { first_name, email, age } = req.body;

      // Validate mandatory fields
      if (!first_name || !email || !age) {
        return res
          .status(400)
          .json({ error: "Member Name, Email, and Age are required." });
      }

      const newStudent = await StudentModel.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (err) {
      console.error("Create error:", err);
      res.status(500).json({ error: "Failed to create student" });
    }
  },

  async getAll(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(50, parseInt(req.query.limit) || 5);
      const offset = (page - 1) * limit;
      const search = req.query.search?.trim() || null;

      const students = await StudentModel.getStudents({
        limit,
        offset,
        search,
      });

      const totalCount = await StudentModel.getTotalCount({
        search,
      });

      const totalPages = Math.ceil(totalCount / limit);

      res.set("X-Total-Count", totalCount);

      res.status(200).json({
        data: students,
        meta: {
          totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    } catch (err) {
      console.error("Pagination error:", err);
      res.status(500).json({ error: "Failed to retrieve students" });
    }
  },

  async getById(req, res) {
    try {
      const student = await StudentModel.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(student);
    } catch (err) {
      console.error("GetById error:", err);
      res.status(500).json({ error: "Failed to retrieve member" });
    }
  },

  async update(req, res) {
    try {
      const { first_name, email, age } = req.body;

      if (!first_name || !email || !age) {
        return res
          .status(400)
          .json({ error: "Member Name, Email, and Age are required." });
      }

      const updated = await StudentModel.updateStudent(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Member not found" });
      }

      res.json(updated);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: "Failed to update member" });
    }
  },

  async remove(req, res) {
    try {
      const deleted = await StudentModel.deleteStudent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json({ message: "Member deleted successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Failed to delete member" });
    }
  },
};

export default StudentController;
