/*
  Warnings:

  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Groups_Ingredients" DROP CONSTRAINT "Groups_Ingredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_postedById_fkey";

-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "users_ingredients" DROP CONSTRAINT "users_ingredients_ingredient_id_fkey";

-- DropTable
DROP TABLE "Ingredients";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "amount" INTEGER,
    "unit" VARCHAR(50),
    "price" MONEY,
    "source" VARCHAR(50),
    "postedById" INTEGER,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Groups_Ingredients" ADD CONSTRAINT "Groups_Ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_ingredients" ADD CONSTRAINT "users_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
