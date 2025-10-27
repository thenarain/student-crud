-- DROP if exists
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS students;

-- Students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  enrollment_no VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  parent_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Subjects lookup table
CREATE TABLE subjects (
  id              SERIAL PRIMARY KEY,
  code            VARCHAR(20) UNIQUE NOT NULL,
  name            VARCHAR(150) NOT NULL,
  max_marks       INT NOT NULL CHECK (max_marks > 0),
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Marks table
CREATE TABLE marks (
  id              SERIAL PRIMARY KEY,
  student_id      INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id      INT NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
  exam_date       DATE,
  marks_obtained  NUMERIC(6,2) CHECK (marks_obtained >= 0),
  grade           VARCHAR(5),
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (student_id, subject_id, exam_date)
);

-- Indexes
CREATE INDEX idx_marks_student_id ON marks(student_id);
CREATE INDEX idx_marks_subject_id ON marks(subject_id);
CREATE INDEX idx_students_enrollment_no ON students(enrollment_no);
