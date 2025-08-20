-- Criação da Tabela: Filmes
CREATE TABLE Filmes (
    FilmeID INTEGER PRIMARY KEY,
    Titulo VARCHAR(255),
    AnoLancamento INTEGER,
    Genero VARCHAR(100)
);

-- Criação da Tabela: Clientes
CREATE TABLE Clientes (
    ClienteID INTEGER PRIMARY KEY,
    Nome VARCHAR(255),
    Email VARCHAR(255)
);

-- Criação da Tabela: Locacoes
CREATE TABLE Locacoes (
    LocacaoID INTEGER PRIMARY KEY,
    ClienteID INTEGER,
    FilmeID INTEGER,
    DataLocacao DATE,
    DataDevolucao DATE,
    PrecoLocacao DECIMAL(10, 2),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    FOREIGN KEY (FilmeID) REFERENCES Filmes(FilmeID)
);
