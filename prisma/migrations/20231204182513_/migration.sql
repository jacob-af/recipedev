-- DropForeignKey
ALTER TABLE "Touch" DROP CONSTRAINT "Touch_buildId_fkey";

-- AddForeignKey
ALTER TABLE "Touch" ADD CONSTRAINT "Touch_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;
