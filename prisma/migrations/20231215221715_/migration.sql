/*
  Warnings:

  - You are about to drop the column `specificIngredientId` on the `ArchivedTouch` table. All the data in the column will be lost.
  - The primary key for the `IngredientPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `specificIngredientId` on the `IngredientPreference` table. All the data in the column will be lost.
  - You are about to drop the column `specificIngredientId` on the `Touch` table. All the data in the column will be lost.
  - You are about to drop the `SpecificIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredientId` to the `IngredientPreference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArchivedTouch" DROP CONSTRAINT "ArchivedTouch_specificIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "CrewIngredient" DROP CONSTRAINT "CrewIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_specificIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientStorage" DROP CONSTRAINT "IngredientStorage_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientUser" DROP CONSTRAINT "IngredientUser_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificIngredient" DROP CONSTRAINT "SpecificIngredient_createdById_fkey";

-- DropForeignKey
ALTER TABLE "SpecificIngredient" DROP CONSTRAINT "SpecificIngredient_ingredientTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_specificIngredientId_fkey";

-- AlterTable
ALTER TABLE "ArchivedTouch" DROP COLUMN "specificIngredientId",
ADD COLUMN     "ingredientId" TEXT;

-- AlterTable
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_pkey",
DROP COLUMN "specificIngredientId",
ADD COLUMN     "ingredientId" TEXT NOT NULL,
ADD CONSTRAINT "IngredientPreference_pkey" PRIMARY KEY ("ingredientTypeId", "ingredientId");

-- AlterTable
ALTER TABLE "Touch" DROP COLUMN "specificIngredientId",
ADD COLUMN     "ingredientId" TEXT;

-- DropTable
DROP TABLE "SpecificIngredient";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "ingredientTypeId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "price" REAL,
    "amount" REAL,
    "unit" TEXT,
    "source" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ArchivedTouch" ADD CONSTRAINT "ArchivedTouch_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "IngredientType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientUser" ADD CONSTRAINT "IngredientUser_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientStorage" ADD CONSTRAINT "IngredientStorage_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CrewIngredient" ADD CONSTRAINT "CrewIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
