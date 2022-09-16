/*
  Warnings:

  - You are about to drop the column `postedBy` on the `Recipes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_postedBy_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "postedBy",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
