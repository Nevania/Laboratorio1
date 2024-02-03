-- Active: 1706478993465@@localhost@5432@postgres
CREATE TABLE productos (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR (100),
  descripcion VARCHAR(500),
  precio INT,
  categoria_id INTEGER,
  FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);