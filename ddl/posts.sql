create table posts(
    id SERIAL PRIMARY KEY , 
    name VARCHAR(50) , 
    body text NOT NULL, 
    createdAt TIMESTAMP NOT NULL, 
    updatedAt TIMESTAMP NOT NULL
);