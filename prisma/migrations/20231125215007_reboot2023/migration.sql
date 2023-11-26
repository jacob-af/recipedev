/*
  Warnings:

  - You are about to drop the column `postedById` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `glassware` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `ice` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `postedById` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `recipeBookId` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `specName` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the `AdminOnInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminOnRecipeBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminOnSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupMod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryIngredientSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeBookSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedRecipeBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Touch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `editedById` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdminOnInventory" DROP CONSTRAINT "AdminOnInventory_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnInventory" DROP CONSTRAINT "AdminOnInventory_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnInventory" DROP CONSTRAINT "AdminOnInventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnRecipeBook" DROP CONSTRAINT "AdminOnRecipeBook_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnRecipeBook" DROP CONSTRAINT "AdminOnRecipeBook_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnRecipeBook" DROP CONSTRAINT "AdminOnRecipeBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnSpec" DROP CONSTRAINT "AdminOnSpec_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnSpec" DROP CONSTRAINT "AdminOnSpec_specId_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnSpec" DROP CONSTRAINT "AdminOnSpec_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupIngredient" DROP CONSTRAINT "GroupIngredient_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupIngredient" DROP CONSTRAINT "GroupIngredient_ingredientSpecId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMod" DROP CONSTRAINT "GroupMod_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMod" DROP CONSTRAINT "GroupMod_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSpec" DROP CONSTRAINT "GroupSpec_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSpec" DROP CONSTRAINT "GroupSpec_specId_fkey";

-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_postedById_fkey";

-- DropForeignKey
ALTER TABLE "IngredientSpec" DROP CONSTRAINT "IngredientSpec_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientSpec" DROP CONSTRAINT "IngredientSpec_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientSpec" DROP CONSTRAINT "IngredientSpec_postedById_fkey";

-- DropForeignKey
ALTER TABLE "InventoryIngredientSpec" DROP CONSTRAINT "InventoryIngredientSpec_addedById_fkey";

-- DropForeignKey
ALTER TABLE "InventoryIngredientSpec" DROP CONSTRAINT "InventoryIngredientSpec_ingredientSpecId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryIngredientSpec" DROP CONSTRAINT "InventoryIngredientSpec_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_createdById_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookSpec" DROP CONSTRAINT "RecipeBookSpec_addedById_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookSpec" DROP CONSTRAINT "RecipeBookSpec_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBookSpec" DROP CONSTRAINT "RecipeBookSpec_specId_fkey";

-- DropForeignKey
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_ingredientSpecId_fkey";

-- DropForeignKey
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedInventory" DROP CONSTRAINT "SharedInventory_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "SharedInventory" DROP CONSTRAINT "SharedInventory_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedInventory" DROP CONSTRAINT "SharedInventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedRecipeBook" DROP CONSTRAINT "SharedRecipeBook_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "SharedRecipeBook" DROP CONSTRAINT "SharedRecipeBook_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedRecipeBook" DROP CONSTRAINT "SharedRecipeBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedSpec" DROP CONSTRAINT "SharedSpec_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedSpec" DROP CONSTRAINT "SharedSpec_specId_fkey";

-- DropForeignKey
ALTER TABLE "SharedSpec" DROP CONSTRAINT "SharedSpec_userId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_postedById_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_recipeBookId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_postedById_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_specId_fkey";

-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "postedById",
ADD COLUMN     "amount" REAL,
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "price" REAL,
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "name" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecipeBook" ADD COLUMN     "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editedById" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "createdById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Spec" DROP COLUMN "glassware",
DROP COLUMN "ice",
DROP COLUMN "instructions",
DROP COLUMN "postedById",
DROP COLUMN "recipeBookId",
DROP COLUMN "recipeId",
DROP COLUMN "specName",
ADD COLUMN     "amount" REAL,
ADD COLUMN     "buildId" INTEGER,
ADD COLUMN     "ingredientId" INTEGER,
ADD COLUMN     "ingredientName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "order" INTEGER,
ADD COLUMN     "unit" VARCHAR(50);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastEdited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "AdminOnInventory";

-- DropTable
DROP TABLE "AdminOnRecipeBook";

-- DropTable
DROP TABLE "AdminOnSpec";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupIngredient";

-- DropTable
DROP TABLE "GroupMod";

-- DropTable
DROP TABLE "GroupSpec";

-- DropTable
DROP TABLE "GroupUser";

-- DropTable
DROP TABLE "IngredientSpec";

-- DropTable
DROP TABLE "InventoryIngredientSpec";

-- DropTable
DROP TABLE "RecipeBookSpec";

-- DropTable
DROP TABLE "SharedIngredient";

-- DropTable
DROP TABLE "SharedInventory";

-- DropTable
DROP TABLE "SharedRecipeBook";

-- DropTable
DROP TABLE "SharedSpec";

-- DropTable
DROP TABLE "Touch";

-- DropTable
DROP TABLE "UserData";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeBookUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeBookId" INTEGER NOT NULL,
    "partner" BOOLEAN NOT NULL,
    "manager" BOOLEAN NOT NULL,

    CONSTRAINT "RecipeBookUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Build" (
    "id" SERIAL NOT NULL,
    "buildName" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "editedById" TEXT NOT NULL,
    "recipeId" INTEGER,
    "instructions" TEXT,
    "notes" TEXT,
    "glassware" VARCHAR,
    "ice" VARCHAR(100),
    "userId" TEXT,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeBookBuild" (
    "id" SERIAL NOT NULL,
    "buildId" INTEGER NOT NULL,
    "recipeBookId" INTEGER NOT NULL,
    "partner" BOOLEAN NOT NULL,
    "manager" BOOLEAN NOT NULL,

    CONSTRAINT "RecipeBookBuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryStorage" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "storageId" INTEGER NOT NULL,

    CONSTRAINT "InventoryStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "editedById" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredientStorage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ingredientId" INTEGER,
    "quantity" DOUBLE PRECISION,
    "storageId" INTEGER,

    CONSTRAINT "ingredientStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crew" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "editedById" TEXT NOT NULL,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCrew" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "crewId" INTEGER NOT NULL,

    CONSTRAINT "UserCrew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBookUser" ADD CONSTRAINT "RecipeBookUser_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RecipeBookUser" ADD CONSTRAINT "RecipeBookUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBookBuild" ADD CONSTRAINT "RecipeBookBuild_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RecipeBookBuild" ADD CONSTRAINT "RecipeBookBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStorage" ADD CONSTRAINT "InventoryStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InventoryStorage" ADD CONSTRAINT "InventoryStorage_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientStorage" ADD CONSTRAINT "ingredientStorage_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingredientStorage" ADD CONSTRAINT "ingredientStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCrew" ADD CONSTRAINT "UserCrew_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCrew" ADD CONSTRAINT "UserCrew_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
