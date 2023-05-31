-- Database Schema Defination for Fenote 
DROP DATABASE IF EXISTS FENOTE;
CREATE DATABASE FENOTE;



USE FENOTE;

-- Users Table to Store user information on the database

Create user 
CREATE USER 'Techtopians'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON FENOTE.* TO 'Techtopians'@'localhost';
FLUSH PRIVILEGES;
