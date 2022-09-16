create table users (
    id INTEGER PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(25),
    last_name VARCHAR(50),
    date_joined DATE NOT NULL,
    email varchar(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);
create table user_data (
    id INTEGER PRIMARY KEY,
    user_id INTEGER references users(id),
    user_bio text,
    work_place varchar(50),
    profile_picture varchar(255)
);
create table groups (
    id INTEGER PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    date_created DATE NOT NULL
);
create table groups_mods (
    user_id INTEGER references users(id),
    group_id INTEGER references groups(id),
    PRIMARY KEY (user_id, group_id)
);
create table groups_users (
    user_id INTEGER references users(id),
    group_id INTEGER references groups(id),
    PRIMARY KEY (user_id, group_id)
);
create table recipes (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by varchar(255) NOT NULL,
    history text
);
create table specs (
    id INTEGER PRIMARY KEY,
    recipe_id INTEGER references recipes(id),
    created_by varchar(255) not null,
    instructions text,
    glassware varchar(50),
    ice varchar(25)
);
create table ingredients (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INTEGER,
    unit varchar(50),
    price money,
    source varchar(50)
);
create table quantities (
    id INTEGER primary KEY,
    spec_id integer references specs(id),
    ingredient_id integer references ingredients(id),
    amount INTEGER,
    unit varchar(50)
);
create table users_ingredients (
    user_id INTEGER references users(id),
    ingredient_id INTEGER references ingredients(id),
    PRIMARY KEY (user_id, ingredient_id)
);
create table users_specs (
    user_id INTEGER references users(id),
    spec_id INTEGER references specs(id),
    PRIMARY KEY (user_id, spec_id)
);
create table groups_ingredients (
    group_id INTEGER references groups(id),
    ingredient_id INTEGER references ingredients(id),
    PRIMARY KEY (group_id, ingredient_id)
);
create table groups_specs (
    group_id INTEGER references groups(id),
    spec_id INTEGER references specs(id),
    PRIMARY KEY (group_id, spec_id)
);