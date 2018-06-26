const pg = require('pg');

const connectionString = 'postgresql://eldarhasandwich:password@localhost:5432/ratings';
const client = new pg.Client(connectionString);
client.connect();

const queryString = `
    DROP TABLE users, contents, ratings CASCADE;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY
    );
    CREATE TABLE contents (
        id SERIAL PRIMARY KEY, 
        title VARCHAR, 
        average_rating FLOAT
    );
    CREATE TABLE ratings (
        id SERIAL PRIMARY KEY, 
        user_ID INT REFERENCES users(ID), 
        content_ID INT REFERENCES contents(ID), 
        rating INT
    );
`

const query = client.query(queryString, (err, res) => {
    console.log(err,res);
    console.log("hey")
});

console.log(query);

client.end();
