CREATE DATABASE rc_service;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATE NOT NULL
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

-- some basic DML, for set up

INSERT INTO posts (username, content, created_at) 
VALUES ('user1', 'This is a posts', '2023-01-01');

INSERT INTO posts (username, content, created_at) 
VALUES ('user2', 'This is another posts', '2023-01-02');

INSERT INTO post_have_replies (post_id, reply_id) 
VALUES (1, 1);

INSERT INTO post_have_replies (post_id, reply_id) 
VALUES (1, 2);

INSERT INTO post_have_replies (post_id, reply_id) 
VALUES (2, 3);

INSERT INTO replies (id, username, content) VALUES
(1, 'user1', 'Amazing!'),
(2, 'user2', 'Waw!'),
(3, 'user2', 'Interesting!');

