
CREATE DATABASE cr;

GO
 
USE cr;

GO
 
CREATE TABLE users (

    user_id INT IDENTITY(1,1) PRIMARY KEY,

    email VARCHAR(100) UNIQUE NOT NULL,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    password VARCHAR(255) NOT NULL,

    admin BIT NOT NULL

);
 
CREATE TABLE programs (

    program_id INT IDENTITY(1,1) PRIMARY KEY,

    program_name VARCHAR(100) UNIQUE NOT NULL,

    program_code VARCHAR(100) UNIQUE NOT NULL,

    program_fees INT NOT NULL,

    program_start_date DATE, 

    program_end_date DATE,   

    program_type VARCHAR(100) NOT NULL

);
 
CREATE TABLE courses (

    course_id INT IDENTITY(1,1) PRIMARY KEY,

    program_id INT FOREIGN KEY REFERENCES programs(program_id) ON DELETE CASCADE, 

    course_code VARCHAR(100) UNIQUE NOT NULL,

    name VARCHAR(100) NOT NULL,

    term VARCHAR(100) NOT NULL,

    description VARCHAR(255) NOT NULL,

    prerequisites VARCHAR(255)

);

CREATE TABLE students (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    department VARCHAR(50) NOT NULL,
    program VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);
 
INSERT INTO users (email, first_name, last_name, password, admin) 

VALUES 

    ('admin@example.com', 'Admin', 'User', 'password', 1),

    ('user@example.com', 'Regular', 'User', 'password', 0);
 
-- Dummy data for the 'program' table
 
INSERT INTO programs (program_name, program_code, program_fees, program_start_date, program_end_date, program_type)

VALUES 

    ('Computer Science', 'CS101', 5000, '2023-01-01', '2023-12-31', 'Bachelor'),

    ('Business Administration', 'BA201', 6000, '2023-02-01', '2023-12-31', 'Bachelor'),

    ('Data Science', 'DS301', 5500, '2023-03-01', '2023-12-31', 'Master');
 
-- Dummy data for the 'courses' table

INSERT INTO courses (program_id, course_code, name, term, description, prerequisites)

VALUES 

    (1, 'CS101-01', 'Introduction to Programming', 'Fall 2023', 'Learn the basics of programming', NULL),

    (1, 'CS101-02', 'Database Management', 'Fall 2023', 'Introduction to database systems', 'CS101-01'),

    (2, 'BA201-01', 'Marketing Fundamentals', 'Spring 2023', 'Principles of marketing', NULL),

    (3, 'DS301-01', 'Machine Learning', 'Fall 2023', 'Introduction to machine learning', 'CS101-01');
 
