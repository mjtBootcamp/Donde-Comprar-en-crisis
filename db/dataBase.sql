CREATE DATABASE postcovid;
\c postcovid
CREATE TABLE scanacuenta (
    id SERIAL PRIMARY KEY, 
    idProducto INT,
    nombreProducto VARCHAR(500), 
    marcaProducto VARCHAR(50),
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scanlider (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(500), 
    marcaProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scanjumbo (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(500), 
    marcaProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scansantaisabel (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(500), 
    marcaProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP);
CREATE TABLE scanunimarc (
    id SERIAL PRIMARY KEY, 
    idProducto INT, 
    nombreProducto VARCHAR(500), 
    marcaProducto VARCHAR(50), 
    precioActual INT,
    imgsrc varchar(500),
    fecha TIMESTAMP); 
