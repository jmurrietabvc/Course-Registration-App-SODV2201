USE [master]
GO

-- If the database already exists, drop it.
IF DB_ID('cr') IS NOT NULL
ALTER DATABASE cr
SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE cr
GO

CREATE DATABASE cr
GO

USE cr
GO

 
CREATE TABLE users (

    user_id						INT IDENTITY(1,1) PRIMARY KEY,
    email						VARCHAR(100) UNIQUE NOT NULL,
    user_firstName				VARCHAR(50) NOT NULL,
    user_lastName				VARCHAR(50) NOT NULL,
    password					VARCHAR(255) NOT NULL,
    admin BIT NOT NULL
);
 
CREATE TABLE program (

    program_id					INT IDENTITY(1,1) PRIMARY KEY,
	program_name				VARCHAR(100) UNIQUE NOT NULL,
	program_max_term			INT NOT NULL,
	program_min_courses_term	INT NOT NULL,
	program_max_courses_term	INT NOT NULL,
    
);
CREATE TABLE term (
	term_id						INT IDENTITY(1,1) PRIMARY KEY,
	term_name					VARCHAR(10) NOT NULL,
	term_start_date				DATE, 
    term_end_date				DATE,
);

CREATE TABLE courses (

    course_id					INT IDENTITY(1,1) PRIMARY KEY,
    course_code					VARCHAR(100) UNIQUE NOT NULL,
    course_name					VARCHAR(100) NOT NULL,
    course_description			VARCHAR(5000) NOT NULL,
	course_fees					MONEY NOT NULL


);
CREATE TABLE term_courses(
	term_course_id				INT IDENTITY(1,1) PRIMARY KEY,
	term_id						INT FOREIGN KEY REFERENCES term(term_id) ON DELETE CASCADE,
	courses_id					INT FOREIGN KEY REFERENCES courses(course_id) ON DELETE CASCADE
);

CREATE TABLE student (
    student_id					INT IDENTITY(1,1) PRIMARY KEY,
    student_firstName			VARCHAR(50) NOT NULL,
    student_lastName			VARCHAR(150) NOT NULL,
    email						VARCHAR(100) UNIQUE NOT NULL,
    phone						VARCHAR(20) NOT NULL,
    dob							DATE NOT NULL,
    program_id					INT FOREIGN KEY REFERENCES program(program_id) ON DELETE CASCADE,
    username					VARCHAR(50) UNIQUE NOT NULL,
    password					VARCHAR(50) NOT NULL
);

CREATE TABLE courses_student(
	courses_student_id			INT IDENTITY(1,1) PRIMARY KEY,
	course_id					INT FOREIGN KEY REFERENCES courses(course_id) ON DELETE CASCADE,
	student_id					INT FOREIGN KEY REFERENCES student(student_id) ON DELETE CASCADE
);
 
-- Dummy data for the 'users' table
INSERT INTO users (email, user_firstName, user_lastName, password, admin) VALUES 

    ('admin@example.com', 'Admin', 'User', 'password', 1),

    ('user@example.com', 'Regular', 'User', 'password', 0);
 


-- Dummy data for the 'program' table
INSERT INTO program (program_name, program_max_term, program_min_courses_term, program_max_courses_term) VALUES 
('Diploma', 4, 2, 5),
('Post-Diploma', 4, 2, 5),
('Certificate', 2, 1,1);
 
 -- Dummy data for the 'term' table
 SET IDENTITY_INSERT term ON;
 INSERT INTO term (term_id, term_name, term_start_date, term_end_date) VALUES
(1, 'Term1', '2023-09-01', '2023-12-20'),
(2, 'Term2', '2024-01-05', '2024-05-02'),
(3, 'Term3', '2024-09-01', '2024-12-20'),
(4, 'Term4', '2025-01-05', '2025-05-02');
SET IDENTITY_INSERT term OFF;


-- Dummy data for the 'courses' table
SET IDENTITY_INSERT courses ON;
INSERT INTO courses (course_id, course_code, course_name, course_description, course_fees) VALUES 
(1,'Pr111', 'Project management1', 'This courses provides a comprehensive introduction to the essential principles and practices of project management.Whether you re a novice or looking to brush up on your skills, you will gain a solid foundation in planning, execution, and monitoring of projects, equipping you with the knowledge and tools needed to successfully lead and contribute to a wide range of endeavors.', 2000.00),
(2,'C++111', 'C++ Programming Fundamentals', 'In this courses, you will delve into the core concepts of C++, including data types, variables, control structures, functions, and object-oriented programming principles. You will gain practical experience through hands-on coding exercises, projects, and real-world applications.', 1000.00),
(3, 'CompM1111', 'Computer Maintenance', 'Discover the essential skills to keep your computer running smoothly with our Computer Maintenance courses. Whether you are a tech enthusiast, a business professional, or just an everyday computer user, this courses is designed to empower you with the knowledge and techniques needed to maintain and troubleshoot your computer hardware and software.', 3000.00),
(4, 'IS1111', 'Information Security1', 'This courses provides a comprehensive introduction to the principles, concepts, and practices of safeguarding sensitive data and systems. Explore the fundamentals of cybersecurity, risk management, encryption, and threat detection. Gain the knowledge and skills to protect valuable information assets and mitigate digital threats.', 1000.00),
(5, 'Net222', 'Networking', 'Dive into the fundamental concepts and practical skills essential for building and managing robust computer networks. From understanding network topologies to configuring routers and switches, this courses equips you with the knowledge and hands-on experience needed to excel in the dynamic field of Information Technology.', 2000.00),
(6, 'Web222', 'Web technology', 'From the fundamentals of HTML and CSS to the latest advancements in web development, this program equips you with the knowledge and skills needed to create and manage cutting-edge websites. Learn about responsive design, JavaScript, content management systems, and emerging trends in the digital landscape.', 3000.00),
(7, 'Pr222', 'Project Management2', 'This courses is designed to take your project management skills to the next level. Explore advanced techniques, tools, and strategies to successfully lead and deliver complex projects. Learn how to tackle challenging project scenarios, optimize resource allocation, and ensure project success from start to finish.', 1000.00),
(8, 'Pr333', 'Advanced Project management1', 'This comprehensive program is designed to empower experienced project managers with the advanced tools, techniques, and strategies needed to tackle complex projects and lead teams to success. Explore topics such as risk management, agile methodologies, stakeholder engagement, and advanced project analytics.', 2000.00),
(9, 'C++333', 'Advanced C++ Programming Fundamentals', 'Explore topics such as template metaprogramming, advanced data structures, memory management, and performance optimization, and gain the expertise needed to write efficient, scalable, and error-free C++ code.', 3000.00),
(10, 'CompM333', 'Advanced Computer Maintenance', 'This comprehensive program is designed for tech-savvy individuals, IT professionals, and computer enthusiasts looking to deepen their understanding of hardware and software troubleshooting, system optimization, and preventive maintenance techniques. Dive into advanced diagnostics, hardware upgrades, data recovery, and explore the latest tools and techniques to keep your computers running smoothly.', 1000.00),
(11, 'IS333', 'Advanced Information Security1', 'Explore advanced topics such as threat intelligence, penetration testing, cryptography, network security, and more. Learn to analyze and mitigate complex cyber threats, understand the latest hacking techniques, and strengthen your organization`s defenses.', 2000.00),
(12, 'Net444', 'Advanced Networking', 'Designed for professionals and enthusiasts eager to take their networking knowledge to the next level, this courses delves into the cutting-edge technologies and strategies that power the digital world. From virtualization and software-defined networks to cybersecurity and cloud integration, you will gain the expertise needed to design, optimize, and secure complex network infrastructures.', 2000.00),
(13, 'Web444', 'Advanced Web technology', 'Explore cutting-edge web development tools, techniques, and trends to master the art of creating dynamic and interactive websites. From responsive design to the latest in web security, this courses equips you with the knowledge and skills needed to stay ahead in the rapidly evolving world of web technology.', 2000.00),
(14, 'Pro444', 'Advanced Project Management2', 'Building upon the foundational principles of project management, this courses delves into advanced techniques and strategies to successfully plan, execute, and close complex projects. Elevate your career and project management capabilities with Advanced Project Management 2.', 2000.00);
SET IDENTITY_INSERT courses OFF;

-- Dummy data for the 'term_courses' table
 INSERT INTO term_courses (term_id, courses_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,5),
(2,6),
(2,7),
(3,8),
(3,9),
(3,10),
(3,11),
(4,12),
(4,13),
(4,14);

-- Dummy data for the 'student' table
SET IDENTITY_INSERT student ON;
INSERT INTO student (student_id, student_firstName, student_lastName, email, phone, dob, program_id, username, password) VALUES
(1, 'Adrian', 'Zach', 'adrianzach@email.com', '111-1111111', '2000-12-10', 1, 'adrianzach', '1234'),
(2, 'Maria', 'Silva', 'mariasilva@email.com', '222-2222222', '1999-08-25', 1, 'mariasilva', '1234'),
(3, 'Carlos', 'Gomes', 'carlosgomes@email.com', '333-3333333', '2002-05-03', 2, 'carlosgomes', '1234'),
(4, 'Isabel', 'Martins', 'isabelmartins@email.com', '444-4444444', '2001-11-18', 3, 'isabelmartins', '1234');
SET IDENTITY_INSERT student OFF;

-- Dummy data for the 'courses_student' table
INSERT INTO courses_student (course_id, student_id) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,2),
(6,2),
(7,2),
(8,3),
(9,3),
(10,3),
(14,4);
