/*
  Warnings:

  - You are about to drop the column `permission` on the `RecipeBookBuild` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeBookBuild" DROP CONSTRAINT "RecipeBookBuild_buildId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookBuild" DROP CONSTRAINT "RecipeBookBuild_recipeBookId_fkey";

-- AlterTable
ALTER TABLE "RecipeBookBuild" DROP COLUMN "permission";

-- AddForeignKey
ALTER TABLE "RecipeBookBuild" ADD CONSTRAINT "RecipeBookBuild_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBookBuild" ADD CONSTRAINT "RecipeBookBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
