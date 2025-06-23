CREATE DATABASE IF NOT EXISTS portaria_tech;

USE portaria_tech;

CREATE TABLE IF NOT EXISTS moradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    numero_apartamento VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 