
DROP DATABASE IF EXISTS ratings;
DROP TABLE IF EXISTS users, contents, ratings CASCADE;

CREATE DATABASE ratings;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY
);

CREATE TABLE contents (
    ID SERIAL PRIMARY KEY,
    title VARCHAR,
    average_rating FLOAT
);

CREATE TABLE ratings (
    ID SERIAL PRIMARY KEY,
    user_ID INT REFERENCES users(ID),
    content_ID INT REFERENCES contents(ID),
    rating INT
);

INSERT INTO users (ID) VALUES (1);
INSERT INTO users (ID) VALUES (2);
INSERT INTO users (ID) VALUES (3);

INSERT INTO contents (ID, title, average_rating) VALUES (1, 'Titanic', 3);
INSERT INTO contents (ID, title, average_rating) VALUES (2, 'The Avengers', 3);
INSERT INTO contents (ID, title, average_rating) VALUES (3, 'Star Wars IV', 3);
