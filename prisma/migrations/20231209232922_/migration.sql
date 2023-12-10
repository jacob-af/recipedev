-- DropForeignKey
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_createdById_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_editedById_fkey";

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
