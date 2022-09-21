/*
  Warnings:

  - You are about to drop the `User_Version` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_Version" DROP CONSTRAINT "User_Version_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Version" DROP CONSTRAINT "User_Version_version_id_fkey";

-- DropTable
DROP TABLE "User_Version";

-- CreateTable
CREATE TABLE "UserVersion" (
    "userId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "UserVersion_pkey" PRIMARY KEY ("userId","versionId")
);

-- AddForeignKey
ALTER TABLE "UserVersion" ADD CONSTRAINT "UserVersion_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserVersion" ADD CONSTRAINT "UserVersion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
