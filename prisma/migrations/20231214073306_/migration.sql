-- DropForeignKey
ALTER TABLE "StorageUser" DROP CONSTRAINT "StorageUser_storageId_fkey";

-- DropForeignKey
ALTER TABLE "StorageUser" DROP CONSTRAINT "StorageUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "StorageUser" ADD CONSTRAINT "StorageUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageUser" ADD CONSTRAINT "StorageUser_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
