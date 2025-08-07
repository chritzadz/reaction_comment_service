CREATE DATABASE rc_service;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY AUTO_INCREMENT,
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
    id SERIAL PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    content TEXT NOT NULL,
);

CREATE TABLE reactions (
    reply_id INT NOT NULL,
    type ENUM('like', 'love', 'haha', 'sad', 'angry') NOT NULL,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY(reply_id, username)
);