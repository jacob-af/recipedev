/*
  Warnings:

  - You are about to drop the column `genericIngredientId` on the `ArchivedTouch` table. All the data in the column will be lost.
  - The primary key for the `IngredientPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genericIngredientId` on the `IngredientPreference` table. All the data in the column will be lost.
  - You are about to drop the column `genericIngredientId` on the `SpecificIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `genericIngredientId` on the `Touch` table. All the data in the column will be lost.
  - You are about to drop the `GenericIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredientTypeId` to the `ArchivedTouch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientTypeId` to the `IngredientPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientTypeId` to the `SpecificIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientTypeId` to the `Touch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArchivedTouch" DROP CONSTRAINT "ArchivedTouch_genericIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_genericIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificIngredient" DROP CONSTRAINT "SpecificIngredient_genericIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_genericIngredientId_fkey";

-- AlterTable
ALTER TABLE "ArchivedTouch" DROP COLUMN "genericIngredientId",
ADD COLUMN     "ingredientTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_pkey",
DROP COLUMN "genericIngredientId",
ADD COLUMN     "ingredientTypeId" TEXT NOT NULL,
ADD CONSTRAINT "IngredientPreference_pkey" PRIMARY KEY ("ingredientTypeId", "specificIngredientId");

-- AlterTable
ALTER TABLE "SpecificIngredient" DROP COLUMN "genericIngredientId",
ADD COLUMN     "ingredientTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Touch" DROP COLUMN "genericIngredientId",
ADD COLUMN     "ingredientTypeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "GenericIngredient";

-- CreateTable
CREATE TABLE "IngredientType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "IngredientType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "IngredientType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ArchivedTouch" ADD CONSTRAINT "ArchivedTouch_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "IngredientType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificIngredient" ADD CONSTRAINT "SpecificIngredient_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "IngredientType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "IngredientType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
