/*
  Warnings:

  - You are about to drop the `Recipes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipesTospecs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_postedById_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesTospecs" DROP CONSTRAINT "_RecipesTospecs_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesTospecs" DROP CONSTRAINT "_RecipesTospecs_B_fkey";

-- AlterTable
ALTER TABLE "specs" ADD COLUMN     "recipeId" INTEGER;

-- DropTable
DROP TABLE "Recipes";

-- DropTable
DROP TABLE "_RecipesTospecs";

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(255) NOT NULL,
    "history" TEXT,
    "postedById" INTEGER,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
