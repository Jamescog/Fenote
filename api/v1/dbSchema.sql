-- Database Schema Defination for Fenote 
DROP DATABASE IF EXISTS FENOTE;
CREATE DATABASE FENOTE;



USE FENOTE;

-- Users Table to Store user information on the database
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password TEXT  NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  user_type ENUM('admin', 'author', 'student') NOT NULL
  confirmed  
);

-- Course Table
CREATE TABLE courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(50) NOT NULL,
  description TEXT,
  prerequisites TEXT,
  skill_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
  author_id INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users(user_id)
);

CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE course_content (
  content_id INT PRIMARY KEY AUTO_INCREMENT,
  content_url TEXT NOT NULL,
  content_order INT NOT NULL,
  week_number INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE assignments (
  assignment_id INT PRIMARY KEY AUTO_INCREMENT,
  assignment_name VARCHAR(50) NOT NULL,
  description TEXT,
  due_date DATE,
  course_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(50) NOT NULL,
  description TEXT,
  due_date DATE,
  course_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE tests (
  test_id INT PRIMARY KEY AUTO_INCREMENT,
  test_name VARCHAR(50) NOT NULL,
  description TEXT,
  passing_score INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE ratings (
  rating_id INT PRIMARY KEY AUTO_INCREMENT,
  rating_value INT NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  review_text TEXT NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE certificates (
  certificate_id INT PRIMARY KEY AUTO_INCREMENT,
  certificate_date DATE NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE scores (
  score_id INT PRIMARY KEY AUTO_INCREMENT,
  score INT NOT NULL,
  assignment_id INT,
  project_id INT,
  student_id INT NOT NULL,
  FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id),
  FOREIGN KEY (student_id) REFERENCES users(user_id)
);

Create user 
CREATE USER 'Techtopians'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON FENOTE.* TO 'Techtopians'@'localhost';
FLUSH PRIVILEGES;
