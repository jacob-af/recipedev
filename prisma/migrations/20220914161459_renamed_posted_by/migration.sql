/*
  Warnings:

  - You are about to drop the column `posted_by` on the `Recipes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_posted_by_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "posted_by",
ADD COLUMN     "postedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
