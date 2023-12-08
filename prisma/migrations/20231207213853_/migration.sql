/*
  Warnings:

  - Added the required column `permission` to the `RecipeBookBuild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeBookBuild" ADD COLUMN     "permission" TEXT NOT NULL;
