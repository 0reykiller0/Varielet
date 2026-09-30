/*const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Servidor de Varielet funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});*/

const express = require('express');
const conexion = require('./db');

const app = express();
const PORT = 3000;

app.use(express.static('../Frontend'));


app.get('/', (req, res) => {
    res.send('Servidor de Varielet funcionando correctamente');
});

app.get('/api/prueba-db', (req, res) => {
    conexion.query('SELECT 1 AS prueba', (error, resultado) => {
        if (error) {
            console.error('Error en la consulta:', error.message);
            return res.status(500).json({
                error: 'Error al consultar la base de datos'
            });
        }

        res.json(resultado);
    });
});


app.get('/api/productos', (req, res) => {
    const consulta = `
        SELECT
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.precio,
            p.imagen,
            c.nombre AS categoria
        FROM productos p
        INNER JOIN categorias c
            ON p.id_categoria = c.id_categoria
        WHERE p.estado = TRUE
        ORDER BY p.id_producto;
    `;

    conexion.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al consultar productos:', error.message);

            return res.status(500).json({
                error: 'Error al consultar los productos'
            });
        }

        res.json(resultados);
    });
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});