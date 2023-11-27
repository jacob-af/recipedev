/*
  Warnings:

  - You are about to drop the column `sources` on the `SpecificIngredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SpecificIngredient" DROP COLUMN "sources",
ADD COLUMN     "source" TEXT;
