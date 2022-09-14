/*
  Warnings:

  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups_ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups_ingredients" DROP CONSTRAINT "groups_ingredients_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_ingredients" DROP CONSTRAINT "groups_ingredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_mods" DROP CONSTRAINT "groups_mods_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_specs" DROP CONSTRAINT "groups_specs_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_users" DROP CONSTRAINT "groups_users_group_id_fkey";

-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "users_ingredients" DROP CONSTRAINT "users_ingredients_ingredient_id_fkey";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "groups_ingredients";

-- DropTable
DROP TABLE "ingredients";

-- CreateTable
CREATE TABLE "Groups" (
    "id" INTEGER NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "date_created" DATE NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups_Ingredients" (
    "group_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "Groups_Ingredients_pkey" PRIMARY KEY ("group_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amount" INTEGER,
    "unit" VARCHAR(50),
    "price" MONEY,
    "source" VARCHAR(50),

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Groups_Ingredients" ADD CONSTRAINT "Groups_Ingredients_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Groups_Ingredients" ADD CONSTRAINT "Groups_Ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_mods" ADD CONSTRAINT "groups_mods_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_specs" ADD CONSTRAINT "groups_specs_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups_users" ADD CONSTRAINT "groups_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_ingredients" ADD CONSTRAINT "users_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
