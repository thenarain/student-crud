-- Reset tables
TRUNCATE TABLE marks RESTART IDENTITY CASCADE;
TRUNCATE TABLE subjects RESTART IDENTITY CASCADE;
TRUNCATE TABLE students RESTART IDENTITY CASCADE;

-- Insert subjects (lookup data)
INSERT INTO subjects (code, name, max_marks)
VALUES
  ('ENG', 'English', 100),
  ('MATH', 'Mathematics', 100),
  ('SCI', 'Science', 100),
  ('HIST', 'History', 100),
  ('COMP', 'Computer Science', 100);

-- Insert 20 students
INSERT INTO students (enrollment_no, first_name, email, age, parent_id)
VALUES
  ('ENR2025001', 'Ravi Kumar', 'ravi.kumar@example.com', 18, 1),
  ('ENR2025002', 'Simran Joshi', 'simran.joshi@example.com', 19, 2),
  ('ENR2025003', 'Amit Verma', 'amit.verma@example.com', 20, 3),
  ('ENR2025004', 'Sneha Singh', 'sneha.singh@example.com', 21, 4),
  ('ENR2025005', 'Vivek Rana', 'vivek.rana@example.com', 18, 5),
  ('ENR2025006', 'Priya Sharma', 'priya.sharma@example.com', 22, 6),
  ('ENR2025007', 'Karan Mehta', 'karan.mehta@example.com', 23, 7),
  ('ENR2025008', 'Neha Patel', 'neha.patel@example.com', 20, 8),
  ('ENR2025009', 'Rohit Chauhan', 'rohit.chauhan@example.com', 19, 9),
  ('ENR2025010', 'Ananya Gupta', 'ananya.gupta@example.com', 18, 10),
  ('ENR2025011', 'Sahil Kapoor', 'sahil.kapoor@example.com', 21, 11),
  ('ENR2025012', 'Isha Bansal', 'isha.bansal@example.com', 22, 12),
  ('ENR2025013', 'Aditya Nair', 'aditya.nair@example.com', 20, 13),
  ('ENR2025014', 'Tanya Das', 'tanya.das@example.com', 19, 14),
  ('ENR2025015', 'Aarav Iyer', 'aarav.iyer@example.com', 21, 15),
  ('ENR2025016', 'Nikita Rao', 'nikita.rao@example.com', 22, 16),
  ('ENR2025017', 'Harshit Jain', 'harshit.jain@example.com', 23, 17),
  ('ENR2025018', 'Divya Tiwari', 'divya.tiwari@example.com', 18, 18),
  ('ENR2025019', 'Laksh Arora', 'laksh.arora@example.com', 19, 19),
  ('ENR2025020', 'Pooja Kulkarni', 'pooja.kulkarni@example.com', 21, 20);

-- Insert marks (each student has marks for a few subjects)
INSERT INTO marks (student_id, subject_id, exam_date, marks_obtained, grade)
VALUES
  (1, 1, '2025-03-01', 88, 'A'),
  (1, 2, '2025-03-02', 91, 'A+'),
  (2, 1, '2025-03-01', 77, 'B'),
  (2, 3, '2025-03-02', 84, 'A'),
  (3, 2, '2025-03-01', 95, 'A+'),
  (3, 4, '2025-03-03', 82, 'A'),
  (4, 5, '2025-03-04', 89, 'A'),
  (5, 1, '2025-03-02', 74, 'B'),
  (6, 2, '2025-03-01', 90, 'A+'),
  (6, 3, '2025-03-03', 85, 'A'),
  (7, 4, '2025-03-02', 81, 'A'),
  (8, 1, '2025-03-01', 67, 'C'),
  (8, 2, '2025-03-03', 72, 'B'),
  (9, 3, '2025-03-04', 80, 'A'),
  (9, 4, '2025-03-01', 79, 'B+'),
  (10, 1, '2025-03-02', 92, 'A+'),
  (10, 2, '2025-03-04', 89, 'A'),
  (11, 3, '2025-03-01', 83, 'A'),
  (11, 5, '2025-03-02', 91, 'A+'),
  (12, 1, '2025-03-01', 76, 'B'),
  (12, 2, '2025-03-03', 84, 'A'),
  (13, 4, '2025-03-02', 80, 'A'),
  (14, 3, '2025-03-01', 88, 'A'),
  (15, 5, '2025-03-03', 92, 'A+'),
  (16, 2, '2025-03-04', 79, 'B+'),
  (17, 1, '2025-03-01', 95, 'A+'),
  (17, 4, '2025-03-02', 82, 'A'),
  (18, 5, '2025-03-03', 90, 'A+'),
  (19, 3, '2025-03-01', 73, 'B'),
  (19, 2, '2025-03-04', 89, 'A'),
  (20, 4, '2025-03-01', 84, 'A'),
  (20, 5, '2025-03-03', 78, 'B+'),
  (10, 3, '2025-03-05', 88, 'A'),
  (2, 5, '2025-03-06', 91, 'A+'),
  (14, 1, '2025-03-04', 87, 'A'),
  (9, 5, '2025-03-07', 93, 'A+'),
  (4, 2, '2025-03-05', 85, 'A'),
  (7, 5, '2025-03-08', 80, 'A'),
  (16, 1, '2025-03-09', 88, 'A'),
  (12, 4, '2025-03-10', 92, 'A+'),
  (3, 5, '2025-03-11', 94, 'A+');
