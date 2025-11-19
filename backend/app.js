// backend/app.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- RUTAS CON POSTGRESQL ---

// [GET] Listar todos los cócteles
app.get('/api/cocktails', async (req, res) => {
  try {
    // Pedimos los datos y renombramos foto_url a fotoUrl para el frontend
    const result = await pool.query(
      'SELECT id, nombre, ingredientes, instrucciones, foto_url AS "fotoUrl" FROM cocktails ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
});

// [GET] Obtener un cóctel por ID
app.get('/api/cocktails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, nombre, ingredientes, instrucciones, foto_url AS "fotoUrl" FROM cocktails WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Cóctel no encontrado');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// [POST] Crear nuevo cóctel
app.post('/api/cocktails', async (req, res) => {
  try {
    const { nombre, ingredientes, instrucciones, fotoUrl } = req.body;
    
    // Insertamos y pedimos que nos devuelva el dato creado (RETURNING)
    const query = `
      INSERT INTO cocktails (nombre, ingredientes, instrucciones, foto_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, ingredientes, instrucciones, foto_url AS "fotoUrl"
    `;
    
    const values = [nombre, ingredientes, instrucciones, fotoUrl];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear cóctel');
  }
});

// [PUT] Editar cóctel
app.put('/api/cocktails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ingredientes, instrucciones, fotoUrl } = req.body;

    const query = `
      UPDATE cocktails
      SET nombre = $1, ingredientes = $2, instrucciones = $3, foto_url = $4
      WHERE id = $5
      RETURNING id, nombre, ingredientes, instrucciones, foto_url AS "fotoUrl"
    `;
    
    const values = [nombre, ingredientes, instrucciones, fotoUrl, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Cóctel no encontrado');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar');
  }
});

// [DELETE] Eliminar cóctel
app.delete('/api/cocktails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM cocktails WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).send('Cóctel no encontrado');
    }

    res.json({ message: 'Cóctel eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend conectado a PostgreSQL en http://localhost:${PORT}`);
});