/*
  Warnings:

  - You are about to drop the column `history` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "history",
DROP COLUMN "origin",
ADD COLUMN     "about" TEXT;
