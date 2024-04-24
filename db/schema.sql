DROP DATABASE IF EXISTS budget_app_db;
CREATE DATABASE budget_app_dbb;
USE budget_app_db;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);