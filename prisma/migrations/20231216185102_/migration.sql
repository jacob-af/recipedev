-- CreateTable
CREATE TABLE "InventoryIngredient" (
    "ingredientId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "InventoryIngredient_pkey" PRIMARY KEY ("ingredientId","inventoryId")
);

-- AddForeignKey
ALTER TABLE "InventoryIngredient" ADD CONSTRAINT "InventoryIngredient_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryIngredient" ADD CONSTRAINT "InventoryIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
