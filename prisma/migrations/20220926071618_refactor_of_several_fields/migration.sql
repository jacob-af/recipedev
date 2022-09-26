/*
  Warnings:

  - You are about to drop the column `amount` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `versionId` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the `AdminOnVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Version` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[specName]` on the table `Spec` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AdminOnVersion" DROP CONSTRAINT "AdminOnVersion_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnVersion" DROP CONSTRAINT "AdminOnVersion_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnVersion" DROP CONSTRAINT "AdminOnVersion_versionId_fkey";

-- DropForeignKey
ALTER TABLE "GroupVersion" DROP CONSTRAINT "GroupVersion_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupVersion" DROP CONSTRAINT "GroupVersion_versionId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsMods" DROP CONSTRAINT "GroupsMods_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsUsers" DROP CONSTRAINT "GroupsUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_postedById_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_postedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedVersion" DROP CONSTRAINT "SharedVersion_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedVersion" DROP CONSTRAINT "SharedVersion_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedVersion" DROP CONSTRAINT "SharedVersion_versionId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_postedById_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_versionId_fkey";

-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- DropForeignKey
ALTER TABLE "Version" DROP CONSTRAINT "Version_postedById_fkey";

-- DropForeignKey
ALTER TABLE "Version" DROP CONSTRAINT "Version_recipeId_fkey";

-- AlterTable
ALTER TABLE "Spec" DROP COLUMN "amount",
DROP COLUMN "ingredientId",
DROP COLUMN "order",
DROP COLUMN "unit",
DROP COLUMN "versionId",
ADD COLUMN     "glassware" VARCHAR(50),
ADD COLUMN     "ice" VARCHAR(25),
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "recipeId" INTEGER,
ADD COLUMN     "specName" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "AdminOnVersion";

-- DropTable
DROP TABLE "GroupVersion";

-- DropTable
DROP TABLE "SharedVersion";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "Version";

-- CreateTable
CREATE TABLE "GroupSpec" (
    "groupId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,

    CONSTRAINT "GroupSpec_pkey" PRIMARY KEY ("groupId","specId")
);

-- CreateTable
CREATE TABLE "Touch" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER,
    "order" INTEGER,
    "amount" REAL,
    "unit" VARCHAR(50),
    "specId" INTEGER,
    "postedById" INTEGER,

    CONSTRAINT "Touch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(25),
    "last_name" VARCHAR(50),
    "date_joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedSpec" (
    "userId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,
    "sharedById" INTEGER NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedSpec_pkey" PRIMARY KEY ("userId","specId")
);

-- CreateTable
CREATE TABLE "AdminOnSpec" (
    "userId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,
    "assignedById" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminOnSpec_pkey" PRIMARY KEY ("userId","specId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Spec_specName_key" ON "Spec"("specName");

-- AddForeignKey
ALTER TABLE "GroupsMods" ADD CONSTRAINT "GroupsMods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupSpec" ADD CONSTRAINT "GroupSpec_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupSpec" ADD CONSTRAINT "GroupSpec_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupsUsers" ADD CONSTRAINT "GroupsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedSpec" ADD CONSTRAINT "SharedSpec_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedSpec" ADD CONSTRAINT "SharedSpec_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedSpec" ADD CONSTRAINT "SharedSpec_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminOnSpec" ADD CONSTRAINT "AdminOnSpec_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnSpec" ADD CONSTRAINT "AdminOnSpec_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnSpec" ADD CONSTRAINT "AdminOnSpec_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
