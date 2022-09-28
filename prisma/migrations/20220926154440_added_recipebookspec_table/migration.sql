/*
  Warnings:

  - The primary key for the `SharedRecipeBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iecipeBookId` on the `SharedRecipeBook` table. All the data in the column will be lost.
  - Added the required column `recipeBookId` to the `SharedRecipeBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SharedRecipeBook" DROP CONSTRAINT "SharedRecipeBook_iecipeBookId_fkey";

-- AlterTable
ALTER TABLE "SharedRecipeBook" DROP CONSTRAINT "SharedRecipeBook_pkey",
DROP COLUMN "iecipeBookId",
ADD COLUMN     "recipeBookId" INTEGER NOT NULL,
ADD CONSTRAINT "SharedRecipeBook_pkey" PRIMARY KEY ("userId", "recipeBookId");

-- CreateTable
CREATE TABLE "RecipeBookSpec" (
    "recipeBookId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,
    "addedById" TEXT NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeBookSpec_pkey" PRIMARY KEY ("recipeBookId","specId")
);

-- AddForeignKey
ALTER TABLE "RecipeBookSpec" ADD CONSTRAINT "RecipeBookSpec_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RecipeBookSpec" ADD CONSTRAINT "RecipeBookSpec_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RecipeBookSpec" ADD CONSTRAINT "RecipeBookSpec_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedRecipeBook" ADD CONSTRAINT "SharedRecipeBook_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
