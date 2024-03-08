/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IngredientType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IngredientType_name_key" ON "IngredientType"("name");
