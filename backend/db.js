const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Reyok1995',
    database: 'varielet'
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar con MySQL:', error.message);
        return;
    }

    console.log('Conexión con MySQL establecida correctamente');
});

module.exports = conexion;