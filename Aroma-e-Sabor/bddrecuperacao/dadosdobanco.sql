CREATE DATABASE minha_api_db;
USE minha_api_db;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO produtos (nome, descricao, preco) VALUES
('Mouse Gamer', 'Mouse ergonômico com 6 botões programáveis.', 150.00),
('Teclado Mecânico', 'Teclado com switches azuis para uma digitação tátil.', 300.00);
