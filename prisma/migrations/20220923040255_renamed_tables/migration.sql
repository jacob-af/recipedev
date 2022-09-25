/*
  Warnings:

  - You are about to drop the column `date_created` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the `Group_Version` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Groups_Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VersionAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups_mods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_data` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateCreated` to the `Groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group_Version" DROP CONSTRAINT "Group_Version_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Group_Version" DROP CONSTRAINT "Group_Version_versionId_fkey";

-- DropForeignKey
ALTER TABLE "Groups_Ingredients" DROP CONSTRAINT "Groups_Ingredients_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Groups_Ingredients" DROP CONSTRAINT "Groups_Ingredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "UserVersion" DROP CONSTRAINT "UserVersion_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVersion" DROP CONSTRAINT "UserVersion_versionId_fkey";

-- DropForeignKey
ALTER TABLE "User_Ingredient" DROP CONSTRAINT "User_Ingredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "User_Ingredient" DROP CONSTRAINT "User_Ingredient_userId_fkey";

-- DropForeignKey
ALTER TABLE "VersionAdmin" DROP CONSTRAINT "VersionAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "VersionAdmin" DROP CONSTRAINT "VersionAdmin_versionId_fkey";

-- DropForeignKey
ALTER TABLE "groups_mods" DROP CONSTRAINT "groups_mods_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_mods" DROP CONSTRAINT "groups_mods_user_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_users" DROP CONSTRAINT "groups_users_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_users" DROP CONSTRAINT "groups_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_data" DROP CONSTRAINT "user_data_user_id_fkey";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "date_created",
DROP COLUMN "group_name",
ADD COLUMN     "dateCreated" DATE NOT NULL,
ADD COLUMN     "groupName" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Group_Version";

-- DropTable
DROP TABLE "Groups_Ingredients";

-- DropTable
DROP TABLE "UserVersion";

-- DropTable
DROP TABLE "User_Ingredient";

-- DropTable
DROP TABLE "VersionAdmin";

-- DropTable
DROP TABLE "groups_mods";

-- DropTable
DROP TABLE "groups_users";

-- DropTable
DROP TABLE "user_data";

-- CreateTable
CREATE TABLE "GroupsIngredients" (
    "groupId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "GroupsIngredients_pkey" PRIMARY KEY ("groupId","ingredientId")
);

-- CreateTable
CREATE TABLE "GroupsMods" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupsMods_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "GroupVersion" (
    "groupId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "GroupVersion_pkey" PRIMARY KEY ("groupId","versionId")
);

-- CreateTable
CREATE TABLE "GroupsUsers" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupsUsers_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "userBio" TEXT,
    "workPlace" VARCHAR(50),
    "profilePicture" VARCHAR(255),

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedIngredient" (
    "userId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "SharedIngredient_pkey" PRIMARY KEY ("userId","ingredientId")
);

-- CreateTable
CREATE TABLE "SharedVersion" (
    "userId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "SharedVersion_pkey" PRIMARY KEY ("userId","versionId")
);

-- CreateTable
CREATE TABLE "AdminOnVersion" (
    "userId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,
    "assignedById" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminOnVersion_pkey" PRIMARY KEY ("userId","versionId")
);

-- AddForeignKey
ALTER TABLE "GroupsIngredients" ADD CONSTRAINT "GroupsIngredients_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupsIngredients" ADD CONSTRAINT "GroupsIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupsMods" ADD CONSTRAINT "GroupsMods_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupsMods" ADD CONSTRAINT "GroupsMods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupVersion" ADD CONSTRAINT "GroupVersion_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupVersion" ADD CONSTRAINT "GroupVersion_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupsUsers" ADD CONSTRAINT "GroupsUsers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupsUsers" ADD CONSTRAINT "GroupsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedIngredient" ADD CONSTRAINT "SharedIngredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedVersion" ADD CONSTRAINT "SharedVersion_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedVersion" ADD CONSTRAINT "SharedVersion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnVersion" ADD CONSTRAINT "AdminOnVersion_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnVersion" ADD CONSTRAINT "AdminOnVersion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
