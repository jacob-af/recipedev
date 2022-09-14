-- CreateTable
CREATE TABLE "groups" (
    "id" INTEGER NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "date_created" DATE NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups_ingredients" (
    "group_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "groups_ingredients_pkey" PRIMARY KEY ("group_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "groups_mods" (
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "groups_mods_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateTable
CREATE TABLE "groups_specs" (
    "group_id" INTEGER NOT NULL,
    "spec_id" INTEGER NOT NULL,

    CONSTRAINT "groups_specs_pkey" PRIMARY KEY ("group_id","spec_id")
);

-- CreateTable
CREATE TABLE "groups_users" (
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "groups_users_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amount" INTEGER,
    "unit" VARCHAR(50),
    "price" MONEY,
    "source" VARCHAR(50),

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quantities" (
    "id" INTEGER NOT NULL,
    "spec_id" INTEGER,
    "ingredient_id" INTEGER,
    "amount" REAL,
    "unit" VARCHAR(50),

    CONSTRAINT "quantities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_by" VARCHAR(255) NOT NULL,
    "history" TEXT,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specs" (
    "id" INTEGER NOT NULL,
    "recipe_id" INTEGER,
    "created_by" VARCHAR(255) NOT NULL,
    "instructions" TEXT,
    "glassware" VARCHAR(50),
    "ice" VARCHAR(25),

    CONSTRAINT "specs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_data" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "user_bio" TEXT,
    "work_place" VARCHAR(50),
    "profile_picture" VARCHAR(255),

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(25),
    "last_name" VARCHAR(50),
    "date_joined" DATE NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_ingredients" (
    "user_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "users_ingredients_pkey" PRIMARY KEY ("user_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "users_specs" (
    "user_id" INTEGER NOT NULL,
    "spec_id" INTEGER NOT NULL,

    CONSTRAINT "users_specs_pkey" PRIMARY KEY ("user_id","spec_id")
);

-- AddForeignKey
ALTER TABLE "groups_ingredients" ADD CONSTRAINT "groups_ingredients_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_ingredients" ADD CONSTRAINT "groups_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_mods" ADD CONSTRAINT "groups_mods_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_mods" ADD CONSTRAINT "groups_mods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_specs" ADD CONSTRAINT "groups_specs_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_specs" ADD CONSTRAINT "groups_specs_spec_id_fkey" FOREIGN KEY ("spec_id") REFERENCES "specs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_users" ADD CONSTRAINT "groups_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_users" ADD CONSTRAINT "groups_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_spec_id_fkey" FOREIGN KEY ("spec_id") REFERENCES "specs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_ingredients" ADD CONSTRAINT "users_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_ingredients" ADD CONSTRAINT "users_ingredients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_specs" ADD CONSTRAINT "users_specs_spec_id_fkey" FOREIGN KEY ("spec_id") REFERENCES "specs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_specs" ADD CONSTRAINT "users_specs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
