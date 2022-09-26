/*
  Warnings:

  - Added the required column `sharedById` to the `SharedIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sharedById` to the `SharedVersion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SharedIngredient" ADD COLUMN     "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sharedById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SharedVersion" ADD COLUMN     "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sharedById" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedVersion" ADD CONSTRAINT "SharedVersion_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
