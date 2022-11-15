CREATE DATABASE postcovid;
\c postcovid
CREATE TABLE scanacuenta (
    id SERIAL PRIMARY KEY, 
    idProducto INT,
    nombreProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scanlider (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scanjumbo (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scansantaisabel (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
SELECT * FROM scanacuenta where nombreProducto LIKE '%1Kg%' order by precioActual asc limit 10;
SELECT * FROM scanlider;
SELECT * FROM scanjumbo;
SELECT * FROM scansantaisabel;