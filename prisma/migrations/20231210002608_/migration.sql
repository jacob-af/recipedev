-- DropForeignKey
ALTER TABLE "RecipeBookUser" DROP CONSTRAINT "RecipeBookUser_recipeBookId_fkey";

-- AddForeignKey
ALTER TABLE "RecipeBookUser" ADD CONSTRAINT "RecipeBookUser_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
