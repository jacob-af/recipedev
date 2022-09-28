/*
  Warnings:

  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupIngredient" DROP CONSTRAINT "GroupIngredient_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMod" DROP CONSTRAINT "GroupMod_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSpec" DROP CONSTRAINT "GroupSpec_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_groupId_fkey";

-- AlterTable
ALTER TABLE "Spec" ADD COLUMN     "recipeBookId" INTEGER;

-- DropTable
DROP TABLE "Groups";

-- CreateTable
CREATE TABLE "AdminOnRecipeBook" (
    "userId" TEXT NOT NULL,
    "specId" INTEGER NOT NULL,
    "assignedById" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminOnRecipeBook_pkey" PRIMARY KEY ("userId","specId")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "groupName" VARCHAR(255) NOT NULL,
    "dateCreated" DATE NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeBook" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "RecipeBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedRecipeBook" (
    "userId" TEXT NOT NULL,
    "iecipeBookId" INTEGER NOT NULL,
    "sharedById" TEXT NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedRecipeBook_pkey" PRIMARY KEY ("userId","iecipeBookId")
);

-- AddForeignKey
ALTER TABLE "AdminOnRecipeBook" ADD CONSTRAINT "AdminOnRecipeBook_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnRecipeBook" ADD CONSTRAINT "AdminOnRecipeBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnRecipeBook" ADD CONSTRAINT "AdminOnRecipeBook_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupIngredient" ADD CONSTRAINT "GroupIngredient_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupMod" ADD CONSTRAINT "GroupMod_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupSpec" ADD CONSTRAINT "GroupSpec_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedRecipeBook" ADD CONSTRAINT "SharedRecipeBook_iecipeBookId_fkey" FOREIGN KEY ("iecipeBookId") REFERENCES "RecipeBook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedRecipeBook" ADD CONSTRAINT "SharedRecipeBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedRecipeBook" ADD CONSTRAINT "SharedRecipeBook_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
