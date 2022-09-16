/*
  Warnings:

  - You are about to drop the column `created_by` on the `specs` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `specs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredients" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postedById" INTEGER;

-- AlterTable
ALTER TABLE "specs" DROP COLUMN "created_by",
DROP COLUMN "recipe_id",
ADD COLUMN     "postedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
