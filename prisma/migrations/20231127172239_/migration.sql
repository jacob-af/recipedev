/*
  Warnings:

  - You are about to drop the `UserCrew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCrew" DROP CONSTRAINT "UserCrew_crewId_fkey";

-- DropForeignKey
ALTER TABLE "UserCrew" DROP CONSTRAINT "UserCrew_userId_fkey";

-- DropTable
DROP TABLE "UserCrew";

-- CreateTable
CREATE TABLE "CrewUser" (
    "userId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "CrewUser_pkey" PRIMARY KEY ("userId","crewId")
);

-- AddForeignKey
ALTER TABLE "CrewUser" ADD CONSTRAINT "CrewUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewUser" ADD CONSTRAINT "CrewUser_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
