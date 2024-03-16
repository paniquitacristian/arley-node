const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config'); // Asegúrate de importar tu configuración de la base de datos

const app2 = express();

app2.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));

  const port = 10101; // Puedes cambiar el puerto según tu configuración
  
  // Ruta para manejar el registro de una persona
  app2.post('/guardarDatos', async (req, res) => {
    let { columna1,columna2,columna3 } = req.body;
    try {
      let [result] = await db.execute('INSERT INTO nombre_tabla (columna1,columna2,columna3) VALUES (?, ?, ?)', [columna1,columna2,columna3]);
      res.status(200).json({ message: 'Datos guardados correctamente', insertId: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Ruta para actualizar los datos de una persona
  app2.put('/actualizarDatos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, descripcion } = req.body;
    try {
      await db.execute('UPDATE nombre_tabla  SET columna1= ?,columna2 = ?, columna3 = ?, WHERE id = ?', [columna1,columna2,columna3, id]);
      res.status(200).json({ message: 'Datos actualizados correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Ruta para obtener los datos de una persona por su ID
  app2.get('/obtenerDatos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute('SELECT * FROM nombre_tabla  WHERE id = ?', [id]);
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: 'Persona no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Ruta para eliminar los datos de una persona por su ID
  app2.delete('/eliminarDatos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.execute('DELETE FROM nombre_tabla  WHERE id = ?', [id]);
      res.status(200).json({ message: 'Datos eliminados correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Iniciar el servidor
  app2.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
  