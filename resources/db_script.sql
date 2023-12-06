CREATE TYPE role_enum AS ENUM ('USER', 'ADMIN');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    passwd_hash TEXT NOT NULL,
    passwd_salt TEXT NOT NULL,
    role role_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    theme VARCHAR(255) NOT NULL DEFAULT 'light'
);

CREATE TABLE IF NOT EXISTS points (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    x_coordinate NUMERIC NOT NULL,
    y_coordinate NUMERIC NOT NULL,
    r_value NUMERIC NOT NULL,
    hit_result BOOLEAN NOT NULL
);