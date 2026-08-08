require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API DevOps funcionando correctamente"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    estado: "OK",
    mensaje: "API operativa"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});