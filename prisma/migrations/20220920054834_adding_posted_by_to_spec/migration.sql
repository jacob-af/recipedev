-- AlterTable
ALTER TABLE "Spec" ADD COLUMN     "postedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
