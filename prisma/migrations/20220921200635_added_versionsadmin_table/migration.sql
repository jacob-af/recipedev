-- CreateTable
CREATE TABLE "VersionAdmin" (
    "userId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "VersionAdmin_pkey" PRIMARY KEY ("userId","versionId")
);

-- AddForeignKey
ALTER TABLE "VersionAdmin" ADD CONSTRAINT "VersionAdmin_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VersionAdmin" ADD CONSTRAINT "VersionAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
