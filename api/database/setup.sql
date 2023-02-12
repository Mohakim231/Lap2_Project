DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS events;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    event_title VARCHAR(30) NOT NULL,
    event_description VARCHAR(500),
    intrest INT DEFAULT 0
);