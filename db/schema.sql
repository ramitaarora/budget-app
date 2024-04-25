DROP DATABASE IF EXISTS budget_app_db;

CREATE DATABASE budget_app_db;

-- USE budget_app_db;

-- CREATE TABLE user (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(100) NOT NULL,
--     location VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE category (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     color VARCHAR(100),
--     flexible BOOL NOT NULL DEFAULT FALSE,
--     parent_category INT,
--     FOREIGN KEY (parent_category) REFERENCES category(id)
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- );

-- CREATE TABLE expenses (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     description VARCHAR(200) NOT NULL,
--     date DATE NOT NULL,
--     amount DECIMAL(20, 2) NOT NULL,
--     category_id INT,
--     FOREIGN KEY (category_id) REFERENCES category(id)
--         ON DELETE SET NULL
--         ON UPDATE CASCADE
-- );

-- CREATE TABLE budget (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     date DATE NOT NULL,
--     category_id INT,
--     total_monthly BOOL NOT NULL DEFAULT FALSE,
--     FOREIGN KEY (category_id) REFERENCES category(id)
--         ON DELETE SET NULL
--         ON UPDATE CASCADE,
--     CHECK (total_monthly = FALSE OR (total_monthly = TRUE AND category_id IS NULL))
-- );

-- Insert a category budget
-- INSERT INTO budget (date, category_id, total_monthly)
-- VALUES ('2024-04-01', 1, FALSE);

-- Insert a total monthly budget
-- INSERT INTO budget (date, total_monthly)
-- VALUES ('2024-04-01', TRUE);

-- CREATE TABLE income (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     date DATE NOT NULL,
--     description VARCHAR(200) NOT NULL,
--     amount DECIMAL(20, 2) NOT NULL
-- );