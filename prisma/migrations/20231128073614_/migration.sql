-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_editedById_fkey";

-- AlterTable
ALTER TABLE "Build" ALTER COLUMN "createdById" DROP NOT NULL,
ALTER COLUMN "editedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
