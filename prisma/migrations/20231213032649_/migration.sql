-- CreateTable
CREATE TABLE "IngredientUser" (
    "ingredientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "IngredientUser_pkey" PRIMARY KEY ("ingredientId","userId")
);

-- AddForeignKey
ALTER TABLE "IngredientUser" ADD CONSTRAINT "IngredientUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientUser" ADD CONSTRAINT "IngredientUser_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
