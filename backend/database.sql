CREATE DATABASE rc_service;

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATE NOT NULL
);