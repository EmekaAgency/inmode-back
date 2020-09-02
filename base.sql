CREATE DATABASE IF NOT EXISTS inmode DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ALTER DATABASE inmode DEFAULT COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_at DATETIME NOT NULL,
    last_connection DATETIME NOT NULL,
    role VARCHAR(8) DEFAULT 'USER',
    CONSTRAINT UniqueUser UNIQUE (email)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS product (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    short_descr TINYTEXT,
    descr TEXT,
    img_path VARCHAR(64),
    price FLOAT NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS payments (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type VARCHAR(16) NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS users_payments (
    id_user INT NOT NULL,
    id_payment INT NOT NULL,
    CONSTRAINT FOREIGN KEY (id_user) REFERENCES users(id),
    CONSTRAINT FOREIGN KEY (id_payment) REFERENCES payments(id),
    CONSTRAINT PRIMARY KEY (id_user, id_payment)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS stock (
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT StockProduct FOREIGN KEY (product_id) REFERENCES product(id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS addresses (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    address VARCHAR(256) NOT NULL,
    longitude DOUBLE NOT NULL,
    lattitude DOUBLE NOT NULL,
    CONSTRAINT FOREIGN KEY (id_user) REFERENCES users(id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    price DOUBLE NOT NULL,
    id_address INT NOT NULL,
    CONSTRAINT FOREIGN KEY (id_user) REFERENCES users(id),
    CONSTRAINT FOREIGN KEY (id_address) REFERENCES addresses(id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS order_detail (
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    CONSTRAINT FOREIGN KEY (id_order) REFERENCES orders(id),
    CONSTRAINT FOREIGN KEY (id_product) REFERENCES product(id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS discount (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    discount_type VARCHAR(16) DEFAULT 'PERCENTAGE',
    discount_amount FLOAT DEFAULT 0,
    CONSTRAINT (product_id) REFERENCES product(id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS menus (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    url TINYTEXT,
    under INT DEFAULT 0,
    type INT DEFAULT 0,
    container VARCHAR(64) DEFAULT 'HEADER-TOP',
    position INT DEFAULT 0,
    variant INT DEFAULT 0,
    CONSTRAINT UniqueMenu PRIMARY KEY (id, name, under)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;