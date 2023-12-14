-- DropForeignKey
ALTER TABLE "ArchivedBuild" DROP CONSTRAINT "ArchivedBuild_buildId_fkey";

-- DropForeignKey
ALTER TABLE "ArchivedBuild" DROP CONSTRAINT "ArchivedBuild_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "ArchivedBuild" ADD CONSTRAINT "ArchivedBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedBuild" ADD CONSTRAINT "ArchivedBuild_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
