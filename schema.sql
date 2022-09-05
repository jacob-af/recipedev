DROP DATABASE IF EXISTS drink_balance_db;
CREATE DATABASE drink_balance_db;
USE drink_balance_db;
create table users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(25),
    last_name VARCHAR(50),
    date_joined DATE NOT NULL email varchar(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);
create table user_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id integer references users(id),
    user_bio text,
    work_place varchar(50),
    profile_picture varchar(255)
);
create table groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name VARCHAR(255) NOT NULL,
    date_created DATE NOT NULL
);
create table groups_mods (
    user_id integer references users(id),
    group_id integer references groups(id),
    PRIMARY KEY (user_id, group_id)
);
create table groups_users (
    user_id integer references users(id),
    group_id integer references groups(id),
    PRIMARY KEY (user_id, group_id)
);