WITH GastoPorClienteAno AS (
    SELECT 
        c.ClienteID,
        c.Nome,
        EXTRACT(YEAR FROM l.DataLocacao) AS Ano,
        SUM(l.PrecoLocacao) AS TotalGasto
    FROM Locacoes l
    JOIN Clientes c ON l.ClienteID = c.ClienteID
    GROUP BY c.ClienteID, c.Nome, EXTRACT(YEAR FROM l.DataLocacao)
),
RankeadoPorAno AS (
    SELECT 
        *,
        RANK() OVER (PARTITION BY Ano ORDER BY TotalGasto DESC) AS Posicao
    FROM GastoPorClienteAno
)
SELECT 
    Ano,
    Nome,
    TotalGasto
FROM RankeadoPorAno
WHERE Posicao = 1
ORDER BY Ano DESC;
