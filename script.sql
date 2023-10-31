
DROP TABLE IF EXISTS utilisateurs CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS produits CASCADE;





CREATE TABLE utilisateurs (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR (255) unique NOT NULL,
    prenom VARCHAR (255) unique NOT NULL,
    email VARCHAR (255) UNIQUE NOT null,
    password CHAR (60) NOT NULL
    );
   

CREATE TABLE categories (
    id_categorie SERIAL PRIMARY KEY,
    nom VARCHAR (255) NOT NULL
    );
    
   
CREATE TABLE produits (
    id_produit SERIAL PRIMARY KEY,
    nom VARCHAR (255) unique NOT NULL,
    prix decimal (10,2) NOT NULL,
    quantite INT NOT null,
    id_categorie INT REFERENCES categories (id_categorie)
    );
    
   
insert into categories (nom) values
('telephone'),
('ordinateur'),
('tablette');

insert into produits(nom,prix,quantite,id_categorie) values
('iphone 15', '1000', '3', '1'),
('iphone 10', '850', '5', '1'),
('MacBook pro', '2200', '10', '2'),
('MacBook air', '1100', '8', '2'),
('ipad mini', '900', '40', '3'),
('ipad pro', '1200', '50', '3');


