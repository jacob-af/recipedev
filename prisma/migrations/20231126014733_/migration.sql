/*
  Warnings:

  - You are about to drop the column `userId` on the `Build` table. All the data in the column will be lost.
  - You are about to drop the column `postedById` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RecipeBook` table. All the data in the column will be lost.
  - You are about to drop the column `manager` on the `RecipeBookBuild` table. All the data in the column will be lost.
  - You are about to drop the column `partner` on the `RecipeBookBuild` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Storage` table. All the data in the column will be lost.
  - You are about to drop the `Spec` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `manager` to the `UserCrew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partner` to the `UserCrew` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_postedById_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_buildId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_userId_fkey";

-- AlterTable
ALTER TABLE "Build" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "postedById",
ADD COLUMN     "createdById" TEXT DEFAULT '',
ALTER COLUMN "origin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecipeBook" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "RecipeBookBuild" DROP COLUMN "manager",
DROP COLUMN "partner";

-- AlterTable
ALTER TABLE "Storage" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "UserCrew" ADD COLUMN     "manager" BOOLEAN NOT NULL,
ADD COLUMN     "partner" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Spec";

-- CreateTable
CREATE TABLE "UserBuild" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "buildId" INTEGER NOT NULL,
    "partner" BOOLEAN NOT NULL,
    "manager" BOOLEAN NOT NULL,

    CONSTRAINT "UserBuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Touch" (
    "id" SERIAL NOT NULL,
    "ingredientName" TEXT NOT NULL DEFAULT '',
    "ingredientId" INTEGER,
    "buildId" INTEGER,
    "order" INTEGER,
    "amount" REAL,
    "unit" VARCHAR(50),

    CONSTRAINT "Touch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStorage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "storageId" INTEGER,
    "partner" BOOLEAN NOT NULL,
    "manager" BOOLEAN NOT NULL,

    CONSTRAINT "UserStorage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBuild" ADD CONSTRAINT "UserBuild_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuild" ADD CONSTRAINT "UserBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStorage" ADD CONSTRAINT "UserStorage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserStorage" ADD CONSTRAINT "UserStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
