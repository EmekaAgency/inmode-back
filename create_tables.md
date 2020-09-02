CREATE DATABASE wepeka;

### Users
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  lastname TEXT NoT NULL,
  mail TEXT NOT NULL,
  picture TEXT DEFAULT NULL,
  inscription DATE NOT NULL
);

### Objet
CREATE TABLE IF NOT EXISTS objects (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);

### Pass
CREATE TABLE IF NOT EXISTS pass (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    price INT NOT NULL,
    name TEXT NOT NULL
);

### Pass_objects
CREATE TABLE IF NOT EXISTS pass_objects (
    pass_id int NOT NULL,
    object_id INT NOT NULL,
    version TEXT DEFAULT NULL,
    CONSTRAINT PAOB_Pass_Id FOREIGN KEY (pass_id) REFERENCES pass(id),
    CONSTRAINT PAOB_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id)
);

### Package
CREATE TABLE IF NOT EXISTS packages (
  object_id INT NOT NULL,
  taux DOUBLE NOT NULL,
  CONSTRAINT PAck_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id)
);

### Prices
CREATE TABLE IF NOT EXISTS prices (
  object_id INT NOT NULL,
  price DOUBLE NOT NULL,
  CONSTRAINT PRIC_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id)
);

### Tokens
CREATE TABLE IF NOT EXISTS tokens (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    define BLOB NOT NULL
);

### Achats
CREATE TABLE IF NOT EXISTS purchases (
  object_id INT NOT NULL,
  user_id INT NOT NULL,
  p_date DATE NOT NULL,
  price DOUBLE NOT NULL,
  token_id INT NOT NULL,
  CONSTRAINT PURC_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id),
  CONSTRAINT PURC_User_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT PURC_token FOREIGN KEY (token_id) REFERENCES tokens(id)
);

### Password print

CREATE TABLE IF NOT EXISTS pass_print (
  user_id INT NOT NULL,
  pass_stamp TEXT NOT NULL,
  salt_p TEXT NOT NULL,
  salt_s TEXT NOT NULL,
  CONSTRAINT PASS_User_Id FOREIGN KEY (user_id) REFERENCES users(id)
);

### FB_users

CREATE TABLE IF NOT EXISTS fb_users (
  user_id INT NOT NULL,
  fb_id INT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT NOT NULL,
  name TEXT NOT NULL,
  name_format TEXT NOT NULL,
  picture TEXT NOT NULL,
  short_name TEXT NOT NULL,
  email TEXT NOT NULL,
  user_age_range INT DEFAULT NULL,
  user_birthday DATE DEFAULT NULL,
  user_gender INT DEFAULT NULL,
  user_hometown TEXT DEFAULT NULL,
  CONSTRAINT FB_User_Id FOREIGN KEY (user_id) REFERENCES users(id)
);

### Paypal accounts
CREATE TABLE IF NOT EXISTS paypal_accounts (
  user_id INT NOT NULL,
  account INT NOT NULL,
  CONSTRAINT PAYP_User_Id FOREIGN KEY (user_id) REFERENCES users(id)
);

### Users
CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name TEXT NOT NULL, lastname TEXT NoT NULL, mail TEXT NOT NULL, picture TEXT DEFAULT NULL, inscription DATE NOT NULL )

### Objet
CREATE TABLE IF NOT EXISTS objects ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name TEXT NOT NULL, type TEXT NOT NULL )

### Pass
CREATE TABLE IF NOT EXISTS pass ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, price INT NOT NULL, name TEXT NOT NULL )

### Pass_objects
CREATE TABLE IF NOT EXISTS pass_objects ( pass_id int NOT NULL, object_id INT NOT NULL, version TEXT DEFAULT NULL, CONSTRAINT PAOB_Pass_Id FOREIGN KEY (pass_id) REFERENCES pass(id), CONSTRAINT PAOB_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id) )

### Package
CREATE TABLE IF NOT EXISTS packages ( object_id INT NOT NULL, taux DOUBLE NOT NULL, CONSTRAINT PAck_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id) )

### Prices
CREATE TABLE IF NOT EXISTS prices ( object_id INT NOT NULL, price DOUBLE NOT NULL, CONSTRAINT PRIC_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id) )

### Tokens
CREATE TABLE IF NOT EXISTS tokens ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, define BLOB NOT NULL )

### Achats
CREATE TABLE IF NOT EXISTS purchases ( object_id INT NOT NULL, user_id INT NOT NULL, p_date DATE NOT NULL, price DOUBLE NOT NULL, token_id INT NOT NULL, CONSTRAINT PURC_Object_Id FOREIGN KEY (object_id) REFERENCES objects(id), CONSTRAINT PURC_User_id FOREIGN KEY (user_id) REFERENCES users(id), CONSTRAINT PURC_token FOREIGN KEY (token_id) REFERENCES tokens(id) )

### Password print
CREATE TABLE IF NOT EXISTS pass_print ( user_id INT NOT NULL, pass_stamp TEXT NOT NULL, salt_p TEXT NOT NULL, salt_s TEXT NOT NULL, CONSTRAINT PASS_User_Id FOREIGN KEY (user_id) REFERENCES users(id) )

### FB_users
CREATE TABLE IF NOT EXISTS fb_users ( user_id INT NOT NULL, fb_id INT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, middle_name TEXT NOT NULL, name TEXT NOT NULL, name_format TEXT NOT NULL, picture TEXT NOT NULL, short_name TEXT NOT NULL, email TEXT NOT NULL, user_age_range INT DEFAULT NULL, user_birthday DATE DEFAULT NULL, user_gender INT DEFAULT NULL, user_hometown TEXT DEFAULT NULL, CONSTRAINT FB_User_Id FOREIGN KEY (user_id) REFERENCES users(id) )

### Paypal accounts
CREATE TABLE IF NOT EXISTS paypal_accounts ( user_id INT NOT NULL, account INT NOT NULL, CONSTRAINT PAYP_User_Id FOREIGN KEY (user_id) REFERENCES users(id) )