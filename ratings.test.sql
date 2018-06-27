
-- drop RATINGS database and connect
DROP DATABASE IF EXISTS ratings_test;
CREATE DATABASE ratings_test;
\c ratings_test;

-- generate structure
\i schema.sql;

-- populate
INSERT INTO users (ID) VALUES (1);
INSERT INTO users (ID) VALUES (2);
INSERT INTO users (ID) VALUES (3);

INSERT INTO contents (ID, title, average_rating) VALUES (1, 'Titanic', 3);
INSERT INTO contents (ID, title, average_rating) VALUES (2, 'The Avengers', 3);
INSERT INTO contents (ID, title, average_rating) VALUES (3, 'Star Wars IV', 3);

INSERT INTO ratings (ID, user_ID, content_ID, rating)
    VALUES (21, 1, 2, 3);

