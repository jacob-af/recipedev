/*
  Warnings:

  - The primary key for the `GroupIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredientId` on the `GroupIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Ingredient` table. All the data in the column will be lost.
  - The primary key for the `SharedIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredientId` on the `SharedIngredient` table. All the data in the column will be lost.
  - Added the required column `ingredientSpecId` to the `GroupIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientSpecId` to the `SharedIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupIngredient" DROP CONSTRAINT "GroupIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_ingredientId_fkey";

-- AlterTable
ALTER TABLE "GroupIngredient" DROP CONSTRAINT "GroupIngredient_pkey",
DROP COLUMN "ingredientId",
ADD COLUMN     "ingredientSpecId" INTEGER NOT NULL,
ADD CONSTRAINT "GroupIngredient_pkey" PRIMARY KEY ("groupId", "ingredientSpecId");

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "amount",
DROP COLUMN "price",
DROP COLUMN "source",
DROP COLUMN "unit";

-- AlterTable
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_pkey",
DROP COLUMN "ingredientId",
ADD COLUMN     "ingredientSpecId" INTEGER NOT NULL,
ADD CONSTRAINT "SharedIngredient_pkey" PRIMARY KEY ("userId", "ingredientSpecId");

-- AlterTable
ALTER TABLE "Spec" ALTER COLUMN "glassware" SET DATA TYPE VARCHAR;

-- CreateTable
CREATE TABLE "IngredientSpec" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "amount" INTEGER,
    "unit" VARCHAR(50),
    "price" MONEY,
    "source" VARCHAR(50),
    "postedById" TEXT NOT NULL,
    "ingredientId" INTEGER,

    CONSTRAINT "IngredientSpec_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupIngredient" ADD CONSTRAINT "GroupIngredient_ingredientSpecId_fkey" FOREIGN KEY ("ingredientSpecId") REFERENCES "IngredientSpec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IngredientSpec" ADD CONSTRAINT "IngredientSpec_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientSpec" ADD CONSTRAINT "IngredientSpec_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_ingredientSpecId_fkey" FOREIGN KEY ("ingredientSpecId") REFERENCES "IngredientSpec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
