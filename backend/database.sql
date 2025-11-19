-- 1. Crear la Base de Datos (Ejecutar esto primero y luego conectarse a ella)
CREATE DATABASE cocteles_db;

-- 2. Crear la Tabla de Cócteles
CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ingredientes TEXT NOT NULL,
    instrucciones TEXT NOT NULL,
    foto_url TEXT NOT NULL
);

-- 3. Insertar datos de prueba (Semilla)
INSERT INTO cocktails (nombre, ingredientes, instrucciones, foto_url) VALUES 
('Margarita', 'Tequila, Jugo de Limón, Cointreau, Sal', 'Mezclar ingredientes y servir en copa con borde de sal.', 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg'),
('Mojito', 'Ron Blanco, Azúcar, Hierbabuena, Jugo de Lima, Agua con gas', 'Macerar la hierbabuena. Añadir el ron y rellenar con agua con gas y hielo.', 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg'),
('Piña Colada', 'Ron Blanco, Crema de Coco, Jugo de Piña', 'Mezclar todos los ingredientes con hielo en una licuadora hasta que quede suave.', 'https://mestredosdrinks.com/es/wp-content/uploads/2023/06/Caipirinha-de-Pina-la-Bebida-Tropical-Mas-Refrescante-del-Mundo-1.jpg'),
('Daiquiri', 'Ron Blanco, Jugo de Lima, Jarabe de Azúcar', 'Agita todos los ingredientes con hielo y cuela en una copa fría.', 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg'),
('Old Fashioned', 'Bourbon o Rye Whiskey, Angostura Bitters, Terrón de Azúcar, Agua', 'Machaca el azúcar con los amargos y el agua. Añade el whisky y hielo. Remueve.', 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg'),
('Cosmopolitan', 'Vodka Citron, Cointreau, Jugo de Lima, Jugo de Arándano', 'Agita con hielo y cuela en una copa de cóctel. Adorna con piel de lima.', 'https://static.wixstatic.com/media/3ede69_cc9526597e4e400d8f3e79abc8fe5af7~mv2.webp/v1/fill/w_552,h_552,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/receta%20el%20padrino%20coctel%20el%20padrino.webp'),
('Dry Martini', 'Ginebra, Vermouth Seco, Aceituna', 'Remueve la ginebra y el vermouth con hielo. Cuela en una copa y añade la aceituna.', 'https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg'),
('Negroni', 'Ginebra, Campari, Vermouth Rojo Dulce', 'Mezcla todos los ingredientes con hielo en un vaso bajo. Decora con naranja.', 'https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg'),
('Whiskey Sour', 'Bourbon, Jugo de Limón, Jarabe de Azúcar, Clara de Huevo (Opcional)', 'Agita en seco (sin hielo) para emulsionar la clara. Añade hielo, agita de nuevo y cuela.', 'https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg'),
('Mai Tai', 'Ron Blanco, Ron Oscuro, Curaçao de Naranja, Jarabe de Almendra (Orgeat), Lima', 'Agita todos los ingredientes con hielo. Cuela en un vaso con hielo picado.', 'https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg'),
('Espresso Martini', 'Vodka, Licor de Café (Kahlúa), Café Espresso, Jarabe de Azúcar', 'Agita fuertemente con hielo para crear espuma. Cuela en copa fría.', 'https://media.scoolinary.app/blog/images/2023/01/scoolinary-como-hacer-espresso-martini4.jpg'),
('Caipirinha', 'Cachaça, Lima (cortada en trozos), Azúcar', 'Machaca la lima con el azúcar en el vaso. Añade hielo y cachaça. Remueve.', 'https://www.thecocktaildb.com/images/media/drink/jgvn7p1582484435.jpg');

-- 4. Verificación
SELECT * FROM cocktails;