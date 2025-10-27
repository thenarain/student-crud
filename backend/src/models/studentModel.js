import pool from "../db/index.js";

const StudentModel = {
  async createStudent(data) {
    const { first_name, email, age, parent_id } = data;

    const result = await pool.query(
      `
      INSERT INTO students (enrollment_no, first_name, email, age, parent_id)
      VALUES (
        CONCAT(
          'ENR',
          EXTRACT(YEAR FROM NOW())::INT,
          LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM students)::TEXT, 4, '0')
        ),
        $1, $2, $3, $4
      )
      RETURNING *;
      `,
      [first_name, email, age, parent_id || null]
    );

    return result.rows[0];
  },

  async getStudents({ limit, offset, search }) {
    let query = `
      SELECT * FROM students
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (
        first_name ILIKE $${params.length}
        OR email ILIKE $${params.length}
        OR enrollment_no ILIKE $${params.length}
      )`;
    }

    params.push(limit);
    params.push(offset);
    query += ` ORDER BY id ASC LIMIT $${params.length - 1} OFFSET $${
      params.length
    }`;

    const result = await pool.query(query, params);
    return result.rows;
  },

  async getTotalCount({ search }) {
    let query = `SELECT COUNT(*) AS total FROM students WHERE 1=1`;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (
        first_name ILIKE $${params.length}
        OR email ILIKE $${params.length}
        OR enrollment_no ILIKE $${params.length}
      )`;
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total, 10);
  },

  async getStudentById(id) {
    const student = await pool.query(`SELECT * FROM students WHERE id = $1`, [
      id,
    ]);
    return student.rows[0] || null;
  },

  async updateStudent(id, data) {
    const { first_name, email, age, parent_id } = data;
    const result = await pool.query(
      `
      UPDATE students
      SET
        first_name = $1,
        email = $2,
        age = $3,
        parent_id = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
      `,
      [first_name, email, age, parent_id || null, id]
    );
    return result.rows[0];
  },

  async deleteStudent(id) {
    const result = await pool.query(
      `DELETE FROM students WHERE id = $1 RETURNING *;`,
      [id]
    );
    return result.rows[0];
  },
};

export default StudentModel;
