




CREATE DATABASE LabdeBDII

USE LabdeBDII

CREATE SCHEMA MeuLabdeBDII

USE MeuLabdeBDII


CREATE TABLE Clientes (
 ClienteID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
 Nome VARCHAR(100),
 Email VARCHAR(100),
 Telefone VARCHAR(15)
);

CREATE TABLE Pedidos (
 PedidoID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
 ClienteID INT,
 DataPedido DATE,
 ValorTotal DECIMAL(10, 2),
 ADD CONSTRAINT Pedidos_ClienteID FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
);


ALTER TABLE Pedidos 
ADD COLUMN Nome VARCHAR(25);

ALTER TABLE Pedidos
DROP FOREIGN KEY Pedidos_ClienteID;

ALTER TABLE Pedidos
DROP COLUMN ClienteID;

ALTER TABLE Clientes
ADD COLUMN CPF VARCHAR(15) NOT NULL;

-- Processo de dropagem de Primary Key auto incrementavel ocorre de forma diferente
-- nao eh necessario dropar a Key antes pois ela eh apagada junto da coluna

ALTER TABLE Clientes
DROP COLUMN ClienteID;

ALTER TABLE Clientes
ADD PRIMARY KEY (CPF);

ALTER TABLE Pedidos
ADD COLUMN CPF VARCHAR(15);

ALTER TABLE Pedidos
ADD CONSTRAINT Pedidos_CPF FOREIGN KEY (CPF) REFERENCES Clientes(CPF);


INSERT INTO Clientes (Nome, Email, Telefone, CPF)
VALUES
 ('João Silva', 'joao@example.com', '(11) 1234-5678', '900.452.367-12'),
 ('Maria Souza', 'maria@example.com', '(22) 9876-5432', '622.025.782-15');


-- Como Status eh uma palavra reservada fiz o uso de um _ no fim
-- para permitir que use a palavra sem causar problema

ALTER TABLE Pedidos
ADD COLUMN Status_ VARCHAR(25);



INSERT INTO Pedidos (DataPedido, ValorTotal, Nome, CPF, Status_)
VALUES
 ('2023-08-30', 150.50, 'João Silva', '900.452.367-12', 'Em Processamento'),
 ('2023-08-29', 75.20, 'Maria Souza', '622.025.782-15', 'Entregue');



SELECT * FROM Clientes

SELECT COUNT(*) AS QuantidadePedidos
FROM Pedidos
WHERE Status_ = 'Em Processamento';

SELECT COUNT(*) AS QuantidadePedidos
FROM Pedidos
WHERE Status_ = 'Entregue';

SELECT AVG(ValorTotal) AS ValorMedioPedidos
FROM Pedidos;

SELECT UPPER(Nome) AS NomeEmCaixaAlta
FROM Clientes;

SELECT *
FROM Pedidos
WHERE ValorTotal = (SELECT MAX(ValorTotal) FROM Pedidos)

SELECT c.Nome AS NomeCliente, MAX(p.DataPedido) AS DataMaisRecentePedido
FROM Clientes c
JOIN Pedidos p ON c.CPF = p.CPF
GROUP BY c.Nome;

SELECT Status_, SUM(ValorTotal) AS ValorTotalVendas
FROM Pedidos
GROUP BY Status_;

-- Se tivesse uma coluna de Idade seria feito a consulta dessa forma
-- SELECT AVG(Idade) AS MediaIdadeClientes FROM Clientes;


-- Se tivesse tambem uma coluna de Sobrenome seria feito a consulta dessa forma
-- SELECT CONCAT(Nome, ' ', Sobrenome) AS NomeCompleto FROM Clientes;


SELECT *
FROM Pedidos
WHERE ValorTotal > (SELECT AVG(ValorTotal) FROM Pedidos);

SELECT SUM(ValorTotal) AS SomatorioValoresEntregue
FROM Pedidos
WHERE Status_ = 'Entregue';

SELECT C.*
FROM Clientes C
WHERE (
  SELECT COUNT(*) 
  FROM Pedidos P 
  WHERE P.cpf = C.cpf
) > 3;

SELECT *
FROM Pedidos
WHERE ValorTotal > (SELECT AVG(ValorTotal) FROM Pedidos);

SELECT
    DATE_FORMAT(DataPedido, '%Y-%m') AS Mes,
    COUNT(*) AS NumeroVendas
FROM Pedidos
GROUP BY Mes
ORDER BY Mes;

SELECT *
FROM Pedidos
WHERE Status_ = 'Entregue' AND ValorTotal > 500
LIMIT 10;

SELECT Status_, SUM(ValorTotal) AS TotalVendas
FROM Pedidos
WHERE ValorTotal > 100
GROUP BY Status_
ORDER BY TotalVendas DESC;


-- Se tivesse uma coluna de Idade seria feito a consulta dessa forma
-- SELECT CASE
--    WHEN Idade BETWEEN 18 AND 25 THEN '18-25'
--    WHEN Idade BETWEEN 26 AND 35 THEN '26-35'
--    WHEN Idade BETWEEN 36 AND 45 THEN '36-45'
--    WHEN Idade BETWEEN 46 AND 55 THEN '46-55'
--     ELSE '56+'
--   END AS FaixaEtaria,
--   COUNT(*) AS TotalClientes
-- FROM Clientes
-- GROUP BY FaixaEtaria
-- ORDER BY TotalClientes DESC;


SELECT *
FROM Pedidos
WHERE Status_ <> 'Entregue' AND ValorTotal < 50
LIMIT 5 OFFSET 0;


SELECT C.*
FROM Clientes C
WHERE CPF IN (
  SELECT CPF
  FROM (
    SELECT CPF, AVG(ValorTotal) AS MediaValorTotal
    FROM Pedidos
    GROUP BY CPF
    ORDER BY MediaValorTotal DESC
    LIMIT 3
  ) AS Subquery
);


SELECT CPF, COUNT(*) AS TotalPedidos
FROM Pedidos
WHERE ValorTotal > 200
GROUP BY CPF
ORDER BY TotalPedidos ASC;


SELECT P1.*
FROM Pedidos P1
INNER JOIN (
  SELECT CPF, MAX(DataPedido) AS UltimoPedido
  FROM Pedidos
  GROUP BY CPF
  HAVING COUNT(*) >= 2
) AS Subquery
ON P1.CPF = Subquery.CPF AND P1.DataPedido = Subquery.UltimoPedido;
