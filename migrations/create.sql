-- Client table
CREATE TABLE client (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(24) NOT NULL
);

-- Project table
CREATE TABLE project (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  tc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end TIMESTAMP DEFAULT NULL,
  client_id INT UNSIGNED,
  FOREIGN KEY (client_id) REFERENCES client(id)
);

-- Task table
CREATE TABLE task (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end TIMESTAMP DEFAULT NULL,
  time INT UNSIGNED,
  title VARCHAR(24) NOT NULL,
  project_id INT UNSIGNED,
  FOREIGN KEY (project_id) REFERENCES project(id)
);

-- Indexes for performance
CREATE INDEX idx_client_name ON client (name);
CREATE INDEX idx_project_name ON project (name);
CREATE INDEX idx_task_title ON task (title);
