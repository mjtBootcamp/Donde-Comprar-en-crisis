CREATE DATABASE postcovid;
\c postcovid
-- CREATE TABLE scanacuenta (id SERIAL PRIMARY KEY, idProducto INT,nombreProducto VARCHAR(500), marcaProducto VARCHAR(50),precioActual INT,imgsrc varchar(500),fecha TIMESTAMP);
-- CREATE TABLE scanlider (id SERIAL PRIMARY KEY, idProducto INT, nombreProducto VARCHAR(500), marcaProducto VARCHAR(50), precioActual INT,imgsrc varchar(500),fecha TIMESTAMP);
-- CREATE TABLE scanjumbo (id SERIAL PRIMARY KEY, idProducto INT, nombreProducto VARCHAR(500), marcaProducto VARCHAR(50), precioActual INT,imgsrc varchar(500),fecha TIMESTAMP);
-- CREATE TABLE scansantaisabel (id SERIAL PRIMARY KEY, idProducto INT, nombreProducto VARCHAR(500), marcaProducto VARCHAR(50), precioActual INT,imgsrc varchar(500),fecha TIMESTAMP);
-- CREATE TABLE scanunimarc (id SERIAL PRIMARY KEY, idProducto INT, nombreProducto VARCHAR(500), marcaProducto VARCHAR(50), precioActual INT,imgsrc varchar(500),fecha TIMESTAMP); 
SELECT * FROM scanacuenta where nombreProducto LIKE '%1Kg%' order by precioActual asc limit 10;
SELECT * FROM scanunimarc where nombreProducto LIKE '%1Kg%' order by precioActual asc limit 10;
SELECT * FROM scanlider;
SELECT * FROM scanjumbo;
SELECT * FROM scansantaisabel;

SELECT id, idProducto, nombreProducto, marcaProducto, precioActual, imgsrc, fecha FROM scansantaisabel;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual, imgsrc, fecha FROM scanacuenta;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual, imgsrc, fecha FROM scanunimarc;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual, imgsrc, fecha FROM scanlider;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual, imgsrc, fecha FROM scanjumbo;

SELECT id, idProducto, nombreProducto, marcaProducto, precioActual FROM scansantaisabel;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual FROM scanacuenta;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual FROM scanunimarc;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual FROM scanlider;
SELECT id, idProducto, nombreProducto, marcaProducto, precioActual FROM scanjumbo;

TRUNCATE TABLE scansantaisabel RESTART IDENTITY;
TRUNCATE TABLE scanacuenta RESTART IDENTITY;
TRUNCATE TABLE scanunimarc RESTART IDENTITY;
TRUNCATE TABLE scanlider RESTART IDENTITY;
TRUNCATE TABLE scanjumbo RESTART IDENTITY;

