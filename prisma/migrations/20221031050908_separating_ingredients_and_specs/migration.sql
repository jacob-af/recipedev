-- AlterTable
ALTER TABLE "IngredientSpec" ADD COLUMN     "inventoryId" INTEGER;

-- CreateTable
CREATE TABLE "AdminOnInventory" (
    "userId" TEXT NOT NULL,
    "assignedById" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventoryId" INTEGER NOT NULL,

    CONSTRAINT "AdminOnInventory_pkey" PRIMARY KEY ("userId","inventoryId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryIngredientSpec" (
    "inventoryId" INTEGER NOT NULL,
    "ingredientSpecId" INTEGER NOT NULL,
    "addedById" TEXT NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryIngredientSpec_pkey" PRIMARY KEY ("inventoryId","ingredientSpecId")
);

-- CreateTable
CREATE TABLE "SharedInventory" (
    "userId" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "sharedById" TEXT NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedInventory_pkey" PRIMARY KEY ("userId","inventoryId")
);

-- AddForeignKey
ALTER TABLE "AdminOnInventory" ADD CONSTRAINT "AdminOnInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnInventory" ADD CONSTRAINT "AdminOnInventory_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdminOnInventory" ADD CONSTRAINT "AdminOnInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientSpec" ADD CONSTRAINT "IngredientSpec_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryIngredientSpec" ADD CONSTRAINT "InventoryIngredientSpec_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InventoryIngredientSpec" ADD CONSTRAINT "InventoryIngredientSpec_ingredientSpecId_fkey" FOREIGN KEY ("ingredientSpecId") REFERENCES "IngredientSpec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InventoryIngredientSpec" ADD CONSTRAINT "InventoryIngredientSpec_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedInventory" ADD CONSTRAINT "SharedInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedInventory" ADD CONSTRAINT "SharedInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SharedInventory" ADD CONSTRAINT "SharedInventory_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
