/*
  Warnings:

  - You are about to drop the column `created_by` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `origin` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_user_id_fkey";

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "created_by",
DROP COLUMN "user_id",
ADD COLUMN     "origin" VARCHAR(255) NOT NULL,
ADD COLUMN     "posted_by" INTEGER;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
