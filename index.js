require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

// Permite que la API reciba datos en formato JSON
app.use(express.json());


// ==========================================
// ENDPOINT PRINCIPAL
// ==========================================
app.get("/", (req, res) => {
  res.json({
    mensaje: "API DevOps funcionando correctamente"
  });
});


// ==========================================
// ENDPOINT DE MONITOREO
// ==========================================
app.get("/health", (req, res) => {
  res.status(200).json({
    estado: "OK",
    mensaje: "API operativa"
  });
});


// ==========================================
// ENDPOINT PARA PROBAR POSTGRESQL
// ==========================================
app.get("/db-test", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT NOW()");

    res.json({
      estado: "OK",
      mensaje: "Conexión con PostgreSQL exitosa",
      fechaBaseDatos: resultado.rows[0].now
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      estado: "ERROR",
      mensaje: "No fue posible conectar con PostgreSQL"
    });
  }
});


// ==========================================
// CONSULTAR TODOS LOS PRODUCTOS
// GET /productos
// ==========================================
app.get("/productos", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM productos ORDER BY id ASC"
    );

    res.status(200).json(resultado.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      estado: "ERROR",
      mensaje: "No fue posible consultar los productos"
    });
  }
});


// ==========================================
// AGREGAR UN NUEVO PRODUCTO
// POST /productos
// ==========================================
app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({
        estado: "ERROR",
        mensaje: "Debe proporcionar nombre, precio y stock"
      });
    }

    const resultado = await pool.query(
      `INSERT INTO productos (nombre, precio, stock)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, precio, stock]
    );

    res.status(201).json({
      estado: "OK",
      mensaje: "Producto agregado correctamente",
      producto: resultado.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      estado: "ERROR",
      mensaje: "No fue posible agregar el producto"
    });
  }
});


// ==========================================
// INICIAR SERVIDOR
// ==========================================
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});