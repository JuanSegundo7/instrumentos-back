DROP DATABASE IF EXISTS Instrumentos;
CREATE DATABASE instrumentos;
USE Instrumentos;

CREATE TABLE categorias(
  id TINYINT(3) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE instrumentos(
	id TINYINT(3) NOT NULL AUTO_INCREMENT,
  	nombre VARCHAR(50) NOT NULL,
    fabricante VARCHAR(30) NOT NULL,
	modelo VARCHAR(30) NOT NULL,
	color VARCHAR(30) NOT NULL,
	precio FLOAT NOT NULL,
  	descuento TINYINT(1) NOT NULL,
  	precioDescuento FLOAT NOT NULL,
  	texto TEXT NOT NULL,
  	fecha DATE NOT NULL,
  	categoria_id TINYINT(3) NOT NULL,
  	PRIMARY KEY(id),
  	FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

CREATE TABLE imagenes(
	id TINYINT(3) NOT NULL AUTO_INCREMENT,
  	url_imagen VARCHAR(255) NOT NULL,
  	instrumento_id TINYINT(3) NOT NULL,
  	PRIMARY KEY(id),
  	FOREIGN KEY(instrumento_id) REFERENCES instrumentos (id)
);


CREATE TABLE usuarios(
	id TINYINT(3) NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
  	nombre VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
  	password VARCHAR(200) NOT NULL,
	avatar VARCHAR(200) NOT NULL, 
  	PRIMARY KEY(id)
);

CREATE TABLE instrumentos_guardados(
	id TINYINT(3) NOT NULL AUTO_INCREMENT,
  	instrumento_id TINYINT(3) NOT NULL,
  	usuario_id TINYINT(3) NOT NULL,
  	PRIMARY KEY(id),
  	FOREIGN KEY(instrumento_id) REFERENCES instrumentos (id),
  	FOREIGN KEY(usuario_id) REFERENCES usuarios (id)
);

