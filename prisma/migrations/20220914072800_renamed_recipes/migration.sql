/*
  Warnings:

  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_posted_by_fkey";

-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_recipe_id_fkey";

-- DropTable
DROP TABLE "recipes";

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(255) NOT NULL,
    "posted_by" INTEGER,
    "history" TEXT,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
