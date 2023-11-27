/*
  Warnings:

  - You are about to drop the column `genericIngredientID` on the `SpecificIngredient` table. All the data in the column will be lost.
  - Added the required column `genericIngredientId` to the `SpecificIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SpecificIngredient" DROP CONSTRAINT "SpecificIngredient_genericIngredientID_fkey";

-- AlterTable
ALTER TABLE "SpecificIngredient" DROP COLUMN "genericIngredientID",
ADD COLUMN     "genericIngredientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SpecificIngredient" ADD CONSTRAINT "SpecificIngredient_genericIngredientId_fkey" FOREIGN KEY ("genericIngredientId") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
