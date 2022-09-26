/*
  Warnings:

  - The primary key for the `AdminOnSpec` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SharedIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SharedSpec` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `GroupsIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsMods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsUsers` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `postedById` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postedById` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postedById` on table `Spec` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postedById` on table `Touch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AdminOnSpec" DROP CONSTRAINT "AdminOnSpec_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "AdminOnSpec" DROP CONSTRAINT "AdminOnSpec_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsIngredients" DROP CONSTRAINT "GroupsIngredients_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsIngredients" DROP CONSTRAINT "GroupsIngredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsMods" DROP CONSTRAINT "GroupsMods_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsMods" DROP CONSTRAINT "GroupsMods_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsUsers" DROP CONSTRAINT "GroupsUsers_groupId_fkey";

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
ALTER TABLE "SharedSpec" DROP CONSTRAINT "SharedSpec_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "SharedSpec" DROP CONSTRAINT "SharedSpec_userId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_postedById_fkey";

-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_postedById_fkey";

-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- AlterTable
ALTER TABLE "AdminOnSpec" DROP CONSTRAINT "AdminOnSpec_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "assignedById" SET DATA TYPE TEXT,
ADD CONSTRAINT "AdminOnSpec_pkey" PRIMARY KEY ("userId", "specId");

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "postedById" SET NOT NULL,
ALTER COLUMN "postedById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "postedById" SET NOT NULL,
ALTER COLUMN "postedById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SharedIngredient" DROP CONSTRAINT "SharedIngredient_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "sharedById" SET DATA TYPE TEXT,
ADD CONSTRAINT "SharedIngredient_pkey" PRIMARY KEY ("userId", "ingredientId");

-- AlterTable
ALTER TABLE "SharedSpec" DROP CONSTRAINT "SharedSpec_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "sharedById" SET DATA TYPE TEXT,
ADD CONSTRAINT "SharedSpec_pkey" PRIMARY KEY ("userId", "specId");

-- AlterTable
ALTER TABLE "Spec" ALTER COLUMN "postedById" SET NOT NULL,
ALTER COLUMN "postedById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Touch" ALTER COLUMN "postedById" SET NOT NULL,
ALTER COLUMN "postedById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserData" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "GroupsIngredients";

-- DropTable
DROP TABLE "GroupsMods";

-- DropTable
DROP TABLE "GroupsUsers";

-- CreateTable
CREATE TABLE "GroupIngredient" (
    "groupId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "GroupIngredient_pkey" PRIMARY KEY ("groupId","ingredientId")
);

-- CreateTable
CREATE TABLE "GroupMod" (
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupMod_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "GroupUser" (
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupUser_pkey" PRIMARY KEY ("userId","groupId")
);

-- AddForeignKey
ALTER TABLE "GroupIngredient" ADD CONSTRAINT "GroupIngredient_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupIngredient" ADD CONSTRAINT "GroupIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupMod" ADD CONSTRAINT "GroupMod_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupMod" ADD CONSTRAINT "GroupMod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedSpec" ADD CONSTRAINT "SharedSpec_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedSpec" ADD CONSTRAINT "SharedSpec_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminOnSpec" ADD CONSTRAINT "AdminOnSpec_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnSpec" ADD CONSTRAINT "AdminOnSpec_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
