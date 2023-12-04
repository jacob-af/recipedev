-- DropForeignKey
ALTER TABLE "BuildUser" DROP CONSTRAINT "BuildUser_buildId_fkey";

-- DropForeignKey
ALTER TABLE "BuildUser" DROP CONSTRAINT "BuildUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "BuildUser" ADD CONSTRAINT "BuildUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildUser" ADD CONSTRAINT "BuildUser_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;
