-- AlterTable
ALTER TABLE "ArchivedBuild" ADD COLUMN     "recipeId" TEXT;

-- AddForeignKey
ALTER TABLE "ArchivedBuild" ADD CONSTRAINT "ArchivedBuild_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
