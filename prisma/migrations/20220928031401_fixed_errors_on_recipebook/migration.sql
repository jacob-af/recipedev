/*
  Warnings:

  - You are about to drop the column `specId` on the `AdminOnRecipeBook` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminOnRecipeBook" DROP CONSTRAINT "AdminOnRecipeBook_specId_fkey";

-- AlterTable
ALTER TABLE "AdminOnRecipeBook" DROP COLUMN "specId";
