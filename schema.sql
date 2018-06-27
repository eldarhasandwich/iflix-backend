
DROP TABLE IF EXISTS users, contents, ratings CASCADE;

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

CREATE INDEX idx_ratings_rating ON ratings USING btree (rating);

