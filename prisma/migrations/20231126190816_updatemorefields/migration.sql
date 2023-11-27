/*
  Warnings:

  - You are about to drop the column `createdAt` on the `IngredientStorage` table. All the data in the column will be lost.
  - You are about to drop the column `editedAt` on the `IngredientStorage` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserStorage` table. All the data in the column will be lost.
  - You are about to drop the column `editedAt` on the `UserStorage` table. All the data in the column will be lost.
  - Added the required column `description` to the `Crew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Crew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SpecificIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crew" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IngredientStorage" DROP COLUMN "createdAt",
DROP COLUMN "editedAt";

-- AlterTable
ALTER TABLE "SpecificIngredient" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserStorage" DROP COLUMN "createdAt",
DROP COLUMN "editedAt";

-- CreateTable
CREATE TABLE "UserInventory" (
    "userId" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "partner" BOOLEAN NOT NULL,
    "manager" BOOLEAN NOT NULL,

    CONSTRAINT "UserInventory_pkey" PRIMARY KEY ("userId","inventoryId")
);

-- AddForeignKey
ALTER TABLE "UserInventory" ADD CONSTRAINT "UserInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInventory" ADD CONSTRAINT "UserInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
