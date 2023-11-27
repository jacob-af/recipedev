/*
  Warnings:

  - The primary key for the `Build` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BuildUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Crew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GenericIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IngredientPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genericIngredientID` on the `IngredientPreference` table. All the data in the column will be lost.
  - You are about to drop the column `specificIngredientID` on the `IngredientPreference` table. All the data in the column will be lost.
  - The primary key for the `IngredientStorage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `InventoryStorage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `InventoryUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecipeBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecipeBookBuild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecipeBookUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SpecificIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Storage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StorageUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Touch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genericIngredientID` on the `Touch` table. All the data in the column will be lost.
  - You are about to drop the column `specificIngredientID` on the `Touch` table. All the data in the column will be lost.
  - The primary key for the `UserCrew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `genericIngredientId` to the `IngredientPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specificIngredientId` to the `IngredientPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genericIngredientId` to the `Touch` table without a default value. This is not possible if the table is not empty.
  - Made the column `buildId` on table `Touch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "BuildUser" DROP CONSTRAINT "BuildUser_buildId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_genericIngredientID_fkey";

-- DropForeignKey
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_specificIngredientID_fkey";

-- DropForeignKey
ALTER TABLE "IngredientStorage" DROP CONSTRAINT "IngredientStorage_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientStorage" DROP CONSTRAINT "IngredientStorage_storageId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryStorage" DROP CONSTRAINT "InventoryStorage_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryStorage" DROP CONSTRAINT "InventoryStorage_storageId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryUser" DROP CONSTRAINT "InventoryUser_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookBuild" DROP CONSTRAINT "RecipeBookBuild_buildId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookBuild" DROP CONSTRAINT "RecipeBookBuild_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookUser" DROP CONSTRAINT "RecipeBookUser_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificIngredient" DROP CONSTRAINT "SpecificIngredient_genericIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "StorageUser" DROP CONSTRAINT "StorageUser_storageId_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_buildId_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_genericIngredientID_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_specificIngredientID_fkey";

-- DropForeignKey
ALTER TABLE "UserCrew" DROP CONSTRAINT "UserCrew_crewId_fkey";

-- AlterTable
ALTER TABLE "Build" DROP CONSTRAINT "Build_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recipeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Build_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Build_id_seq";

-- AlterTable
ALTER TABLE "BuildUser" DROP CONSTRAINT "BuildUser_pkey",
ALTER COLUMN "buildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BuildUser_pkey" PRIMARY KEY ("userId", "buildId");

-- AlterTable
ALTER TABLE "Crew" DROP CONSTRAINT "Crew_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Crew_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Crew_id_seq";

-- AlterTable
ALTER TABLE "GenericIngredient" DROP CONSTRAINT "GenericIngredient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GenericIngredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GenericIngredient_id_seq";

-- AlterTable
ALTER TABLE "IngredientPreference" DROP CONSTRAINT "IngredientPreference_pkey",
DROP COLUMN "genericIngredientID",
DROP COLUMN "specificIngredientID",
ADD COLUMN     "genericIngredientId" TEXT NOT NULL,
ADD COLUMN     "specificIngredientId" TEXT NOT NULL,
ADD CONSTRAINT "IngredientPreference_pkey" PRIMARY KEY ("genericIngredientId", "specificIngredientId");

-- AlterTable
ALTER TABLE "IngredientStorage" DROP CONSTRAINT "IngredientStorage_pkey",
ALTER COLUMN "ingredientId" SET DATA TYPE TEXT,
ALTER COLUMN "storageId" SET DATA TYPE TEXT,
ADD CONSTRAINT "IngredientStorage_pkey" PRIMARY KEY ("ingredientId", "storageId");

-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Inventory_id_seq";

-- AlterTable
ALTER TABLE "InventoryStorage" DROP CONSTRAINT "InventoryStorage_pkey",
ALTER COLUMN "inventoryId" SET DATA TYPE TEXT,
ALTER COLUMN "storageId" SET DATA TYPE TEXT,
ADD CONSTRAINT "InventoryStorage_pkey" PRIMARY KEY ("inventoryId", "storageId");

-- AlterTable
ALTER TABLE "InventoryUser" DROP CONSTRAINT "InventoryUser_pkey",
ALTER COLUMN "inventoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "InventoryUser_pkey" PRIMARY KEY ("userId", "inventoryId");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Recipe_id_seq";

-- AlterTable
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecipeBook_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecipeBook_id_seq";

-- AlterTable
ALTER TABLE "RecipeBookBuild" DROP CONSTRAINT "RecipeBookBuild_pkey",
ALTER COLUMN "buildId" SET DATA TYPE TEXT,
ALTER COLUMN "recipeBookId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecipeBookBuild_pkey" PRIMARY KEY ("buildId", "recipeBookId");

-- AlterTable
ALTER TABLE "RecipeBookUser" DROP CONSTRAINT "RecipeBookUser_pkey",
ALTER COLUMN "recipeBookId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecipeBookUser_pkey" PRIMARY KEY ("userId", "recipeBookId");

-- AlterTable
ALTER TABLE "SpecificIngredient" DROP CONSTRAINT "SpecificIngredient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "genericIngredientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SpecificIngredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SpecificIngredient_id_seq";

-- AlterTable
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Storage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Storage_id_seq";

-- AlterTable
ALTER TABLE "StorageUser" DROP CONSTRAINT "StorageUser_pkey",
ALTER COLUMN "storageId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StorageUser_pkey" PRIMARY KEY ("userId", "storageId");

-- AlterTable
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_pkey",
DROP COLUMN "genericIngredientID",
DROP COLUMN "specificIngredientID",
ADD COLUMN     "genericIngredientId" TEXT NOT NULL,
ADD COLUMN     "specificIngredientId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "buildId" SET NOT NULL,
ALTER COLUMN "buildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Touch_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Touch_id_seq";

-- AlterTable
ALTER TABLE "UserCrew" DROP CONSTRAINT "UserCrew_pkey",
ALTER COLUMN "crewId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserCrew_pkey" PRIMARY KEY ("userId", "crewId");

-- AddForeignKey
ALTER TABLE "RecipeBookUser" ADD CONSTRAINT "RecipeBookUser_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildUser" ADD CONSTRAINT "BuildUser_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBookBuild" ADD CONSTRAINT "RecipeBookBuild_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RecipeBookBuild" ADD CONSTRAINT "RecipeBookBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_genericIngredientId_fkey" FOREIGN KEY ("genericIngredientId") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_specificIngredientId_fkey" FOREIGN KEY ("specificIngredientId") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificIngredient" ADD CONSTRAINT "SpecificIngredient_genericIngredientId_fkey" FOREIGN KEY ("genericIngredientId") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_genericIngredientId_fkey" FOREIGN KEY ("genericIngredientId") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_specificIngredientId_fkey" FOREIGN KEY ("specificIngredientId") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStorage" ADD CONSTRAINT "InventoryStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InventoryStorage" ADD CONSTRAINT "InventoryStorage_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientStorage" ADD CONSTRAINT "IngredientStorage_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientStorage" ADD CONSTRAINT "IngredientStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageUser" ADD CONSTRAINT "StorageUser_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCrew" ADD CONSTRAINT "UserCrew_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
