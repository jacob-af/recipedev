/*
  Warnings:

  - The primary key for the `InventoryStorage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InventoryStorage` table. All the data in the column will be lost.
  - The primary key for the `RecipeBookBuild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RecipeBookBuild` table. All the data in the column will be lost.
  - The primary key for the `RecipeBookUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RecipeBookUser` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `Touch` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientName` on the `Touch` table. All the data in the column will be lost.
  - The primary key for the `UserBuild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserBuild` table. All the data in the column will be lost.
  - The primary key for the `UserCrew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserCrew` table. All the data in the column will be lost.
  - The primary key for the `UserStorage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserStorage` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `UserStorage` table. All the data in the column will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredientStorage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genericIngredientID` to the `Touch` table without a default value. This is not possible if the table is not empty.
  - Made the column `storageId` on table `UserStorage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "UserStorage" DROP CONSTRAINT "UserStorage_storageId_fkey";

-- DropForeignKey
ALTER TABLE "ingredientStorage" DROP CONSTRAINT "ingredientStorage_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredientStorage" DROP CONSTRAINT "ingredientStorage_storageId_fkey";

-- AlterTable
ALTER TABLE "InventoryStorage" DROP CONSTRAINT "InventoryStorage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "InventoryStorage_pkey" PRIMARY KEY ("inventoryId", "storageId");

-- AlterTable
ALTER TABLE "RecipeBook" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "RecipeBookBuild" DROP CONSTRAINT "RecipeBookBuild_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RecipeBookBuild_pkey" PRIMARY KEY ("buildId", "recipeBookId");

-- AlterTable
ALTER TABLE "RecipeBookUser" DROP CONSTRAINT "RecipeBookUser_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RecipeBookUser_pkey" PRIMARY KEY ("userId", "recipeBookId");

-- AlterTable
ALTER TABLE "Touch" DROP COLUMN "ingredientId",
DROP COLUMN "ingredientName",
ADD COLUMN     "genericIngredientID" INTEGER NOT NULL,
ADD COLUMN     "specificIngredientID" INTEGER;

-- AlterTable
ALTER TABLE "UserBuild" DROP CONSTRAINT "UserBuild_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserBuild_pkey" PRIMARY KEY ("userId", "buildId");

-- AlterTable
ALTER TABLE "UserCrew" DROP CONSTRAINT "UserCrew_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserCrew_pkey" PRIMARY KEY ("userId", "crewId");

-- AlterTable
ALTER TABLE "UserStorage" DROP CONSTRAINT "UserStorage_pkey",
DROP COLUMN "id",
DROP COLUMN "quantity",
ALTER COLUMN "storageId" SET NOT NULL,
ADD CONSTRAINT "UserStorage_pkey" PRIMARY KEY ("userId", "storageId");

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "ingredientStorage";

-- CreateTable
CREATE TABLE "GenericIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "GenericIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificIngredient" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "genericIngredientID" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "price" REAL,
    "amount" REAL,
    "unit" TEXT,

    CONSTRAINT "SpecificIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientPreference" (
    "genericIngredientID" INTEGER NOT NULL,
    "specificIngredientID" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IngredientPreference_pkey" PRIMARY KEY ("genericIngredientID","specificIngredientID")
);

-- CreateTable
CREATE TABLE "IngredientStorage" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ingredientId" INTEGER NOT NULL,
    "storageId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION,

    CONSTRAINT "IngredientStorage_pkey" PRIMARY KEY ("ingredientId","storageId")
);

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_genericIngredientID_fkey" FOREIGN KEY ("genericIngredientID") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_specificIngredientID_fkey" FOREIGN KEY ("specificIngredientID") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificIngredient" ADD CONSTRAINT "SpecificIngredient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificIngredient" ADD CONSTRAINT "SpecificIngredient_genericIngredientID_fkey" FOREIGN KEY ("genericIngredientID") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_genericIngredientID_fkey" FOREIGN KEY ("genericIngredientID") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_specificIngredientID_fkey" FOREIGN KEY ("specificIngredientID") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientPreference" ADD CONSTRAINT "IngredientPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientStorage" ADD CONSTRAINT "IngredientStorage_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientStorage" ADD CONSTRAINT "IngredientStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStorage" ADD CONSTRAINT "UserStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
