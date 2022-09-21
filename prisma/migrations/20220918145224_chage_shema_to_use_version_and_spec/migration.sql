/*
  Warnings:

  - You are about to drop the `groups_specs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quantities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_specs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups_specs" DROP CONSTRAINT "groups_specs_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groups_specs" DROP CONSTRAINT "groups_specs_spec_id_fkey";

-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_spec_id_fkey";

-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_postedById_fkey";

-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "users_ingredients" DROP CONSTRAINT "users_ingredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "users_ingredients" DROP CONSTRAINT "users_ingredients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_specs" DROP CONSTRAINT "users_specs_spec_id_fkey";

-- DropForeignKey
ALTER TABLE "users_specs" DROP CONSTRAINT "users_specs_user_id_fkey";

-- DropTable
DROP TABLE "groups_specs";

-- DropTable
DROP TABLE "quantities";

-- DropTable
DROP TABLE "specs";

-- DropTable
DROP TABLE "users_ingredients";

-- DropTable
DROP TABLE "users_specs";

-- CreateTable
CREATE TABLE "Group_Version" (
    "groupId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "Group_Version_pkey" PRIMARY KEY ("groupId","versionId")
);

-- CreateTable
CREATE TABLE "Spec" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER,
    "amount" REAL,
    "unit" VARCHAR(50),
    "versionId" INTEGER,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "postedById" INTEGER,
    "instructions" TEXT,
    "glassware" VARCHAR(50),
    "ice" VARCHAR(25),
    "recipeId" INTEGER,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Ingredient" (
    "userId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "User_Ingredient_pkey" PRIMARY KEY ("userId","ingredientId")
);

-- CreateTable
CREATE TABLE "User_Version" (
    "user_id" INTEGER NOT NULL,
    "version_id" INTEGER NOT NULL,

    CONSTRAINT "User_Version_pkey" PRIMARY KEY ("user_id","version_id")
);

-- AddForeignKey
ALTER TABLE "Group_Version" ADD CONSTRAINT "Group_Version_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group_Version" ADD CONSTRAINT "Group_Version_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Ingredient" ADD CONSTRAINT "User_Ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User_Ingredient" ADD CONSTRAINT "User_Ingredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User_Version" ADD CONSTRAINT "User_Version_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User_Version" ADD CONSTRAINT "User_Version_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
