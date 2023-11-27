/*
  Warnings:

  - You are about to drop the column `manager` on the `RecipeBookUser` table. All the data in the column will be lost.
  - You are about to drop the column `partner` on the `RecipeBookUser` table. All the data in the column will be lost.
  - You are about to drop the column `manager` on the `UserCrew` table. All the data in the column will be lost.
  - You are about to drop the column `partner` on the `UserCrew` table. All the data in the column will be lost.
  - You are about to drop the `UserBuild` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserStorage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permission` to the `RecipeBookUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permission` to the `UserCrew` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBuild" DROP CONSTRAINT "UserBuild_buildId_fkey";

-- DropForeignKey
ALTER TABLE "UserBuild" DROP CONSTRAINT "UserBuild_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserInventory" DROP CONSTRAINT "UserInventory_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserInventory" DROP CONSTRAINT "UserInventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStorage" DROP CONSTRAINT "UserStorage_storageId_fkey";

-- DropForeignKey
ALTER TABLE "UserStorage" DROP CONSTRAINT "UserStorage_userId_fkey";

-- AlterTable
ALTER TABLE "RecipeBookUser" DROP COLUMN "manager",
DROP COLUMN "partner",
ADD COLUMN     "permission" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpecificIngredient" ADD COLUMN     "sources" TEXT;

-- AlterTable
ALTER TABLE "UserCrew" DROP COLUMN "manager",
DROP COLUMN "partner",
ADD COLUMN     "permission" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserBuild";

-- DropTable
DROP TABLE "UserInventory";

-- DropTable
DROP TABLE "UserStorage";

-- CreateTable
CREATE TABLE "BuildUser" (
    "userId" TEXT NOT NULL,
    "buildId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "BuildUser_pkey" PRIMARY KEY ("userId","buildId")
);

-- CreateTable
CREATE TABLE "InventoryUser" (
    "userId" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "InventoryUser_pkey" PRIMARY KEY ("userId","inventoryId")
);

-- CreateTable
CREATE TABLE "StorageUser" (
    "userId" TEXT NOT NULL,
    "storageId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "StorageUser_pkey" PRIMARY KEY ("userId","storageId")
);

-- AddForeignKey
ALTER TABLE "BuildUser" ADD CONSTRAINT "BuildUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildUser" ADD CONSTRAINT "BuildUser_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageUser" ADD CONSTRAINT "StorageUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StorageUser" ADD CONSTRAINT "StorageUser_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
