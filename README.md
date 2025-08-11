# reaction_comment_service

## postgresql setup
Postgres is used to create a simple database scheme for fetching data related to the app

use -U postgres is sufficient

install postgres locally, if have not, and set up the database as follow:
```
  CREATE DATABASE rc_service;

  CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at DATE NOT NULL
  );

  CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY
  );

  CREATE TABLE post_have_replies (
      post_id INT NOT NULL,
      reply_id INT NOT NULL,
      PRIMARY KEY (post_id, reply_id)
  );

  CREATE TABLE replies (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      content TEXT NOT NULL
  );

  CREATE TABLE reactions (
      reply_id INT NOT NULL,
      type VARCHAR(255) NOT NULL CHECK (type IN ('like', 'love', 'haha', 'sad', 'angry')),
      username VARCHAR(255) NOT NULL,
      PRIMARY KEY(reply_id, username)
  );
```

if needed, below is the dummy data:
```
-- some basic DML, for set up
INSERT INTO posts (username, content, created_at) VALUES 
('user1', 'This is a posts', '2023-01-01'),
('user2', 'This is another posts', '2023-01-02');


INSERT INTO post_have_replies (post_id, reply_id) VALUES
(1, 1),
(1, 2),
(2, 3);

INSERT INTO replies (id, username, content) VALUES
(1, 'user1', 'Amazing!'),
(2, 'user2', 'Waw!'),
(3, 'user2', 'Interesting!');

INSERT INTO users (username) VALUES
('user1'),
('user2');
```

## local run
the repository contain both frontend and backend, so navigate to each folder and run both locally:
```
npm install
```
```
npm run dev
```

# docker-compose setup
not yet implemented
```
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydatabase
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/database.sql:/docker-entrypoint-initdb.d/database.sql

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/mydatabase
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
```