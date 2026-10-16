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

// =====================================================
// REGISTRAR SOLICITUD DE COTIZACIÓN
// =====================================================

app.use(express.json());

app.post('/api/solicitudes', (req, res) => {

    const {
        nombre_cliente,
        correo,
        telefono,
        producto,
        cantidad,
        fecha_evento,
        personalizacion,
        mensaje
    } = req.body;

    // Validaciones básicas
    if (!nombre_cliente || !telefono || !producto || !cantidad || !personalizacion) {
        return res.status(400).json({
            error: 'Faltan datos obligatorios'
        });
    }

    const consulta = `
        INSERT INTO solicitudes
        (
            nombre_cliente,
            correo,
            telefono,
            producto,
            cantidad,
            fecha_evento,
            personalizacion,
            mensaje
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        nombre_cliente,
        correo || null,
        telefono,
        producto,
        cantidad,
        fecha_evento || null,
        personalizacion,
        mensaje || null
    ];

    conexion.query(consulta, valores, (error, resultado) => {

        if (error) {

            console.error(
                'Error al guardar la solicitud:',
                error.message
            );

            return res.status(500).json({
                error: 'No se pudo guardar la solicitud'
            });
        }

        console.log(
            'Solicitud registrada. ID:',
            resultado.insertId
        );

        res.status(201).json({
            mensaje: 'Solicitud registrada correctamente',
            id_solicitud: resultado.insertId
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


// =====================================================
// CONSULTAR SOLICITUDES
// =====================================================

app.get('/api/solicitudes', (req, res) => {

    const consulta = `
        SELECT
            id_solicitud,
            nombre_cliente,
            correo,
            telefono,
            producto,
            cantidad,
            fecha_evento,
            personalizacion,
            mensaje,
            estado,
            fecha_solicitud
        FROM solicitudes
        ORDER BY id_solicitud DESC
    `;

    conexion.query(consulta, (error, resultados) => {

        if (error) {
            console.error(
                'Error al consultar solicitudes:',
                error.message
            );

            return res.status(500).json({
                error: 'No se pudieron consultar las solicitudes'
            });
        }

        res.json(resultados);
    });
});