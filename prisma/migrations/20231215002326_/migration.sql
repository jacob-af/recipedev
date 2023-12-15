/*
  Warnings:

  - You are about to drop the column `permission` on the `CrewBuild` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `CrewIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `CrewInventory` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `CrewRecipeBook` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `CrewStorage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CrewBuild" DROP COLUMN "permission";

-- AlterTable
ALTER TABLE "CrewIngredient" DROP COLUMN "permission";

-- AlterTable
ALTER TABLE "CrewInventory" DROP COLUMN "permission";

-- AlterTable
ALTER TABLE "CrewRecipeBook" DROP COLUMN "permission";

-- AlterTable
ALTER TABLE "CrewStorage" DROP COLUMN "permission";
