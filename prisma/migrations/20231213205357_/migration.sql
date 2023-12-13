-- DropForeignKey
ALTER TABLE "IngredientUser" DROP CONSTRAINT "IngredientUser_ingredientId_fkey";

-- AddForeignKey
ALTER TABLE "IngredientUser" ADD CONSTRAINT "IngredientUser_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "SpecificIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
