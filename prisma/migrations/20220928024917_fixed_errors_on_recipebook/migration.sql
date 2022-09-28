/*
  Warnings:

  - The primary key for the `AdminOnRecipeBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `recipeBookId` to the `AdminOnRecipeBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdminOnRecipeBook" DROP CONSTRAINT "AdminOnRecipeBook_specId_fkey";

-- AlterTable
ALTER TABLE "AdminOnRecipeBook" DROP CONSTRAINT "AdminOnRecipeBook_pkey",
ADD COLUMN     "recipeBookId" INTEGER NOT NULL,
ALTER COLUMN "specId" DROP NOT NULL,
ADD CONSTRAINT "AdminOnRecipeBook_pkey" PRIMARY KEY ("userId", "recipeBookId");

-- AddForeignKey
ALTER TABLE "AdminOnRecipeBook" ADD CONSTRAINT "AdminOnRecipeBook_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnRecipeBook" ADD CONSTRAINT "AdminOnRecipeBook_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE SET NULL ON UPDATE CASCADE;
