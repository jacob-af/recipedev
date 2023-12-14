-- DropForeignKey
ALTER TABLE "InventoryStorage" DROP CONSTRAINT "InventoryStorage_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryStorage" DROP CONSTRAINT "InventoryStorage_storageId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryUser" DROP CONSTRAINT "InventoryUser_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryUser" DROP CONSTRAINT "InventoryUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStorage" ADD CONSTRAINT "InventoryStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStorage" ADD CONSTRAINT "InventoryStorage_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
