-- DropForeignKey
ALTER TABLE "CrewUser" DROP CONSTRAINT "CrewUser_crewId_fkey";

-- DropForeignKey
ALTER TABLE "CrewUser" DROP CONSTRAINT "CrewUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "CrewUser" ADD CONSTRAINT "CrewUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewUser" ADD CONSTRAINT "CrewUser_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;
