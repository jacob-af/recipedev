-- CreateTable
CREATE TABLE "CrewInventory" (
    "inventoryId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "CrewInventory_pkey" PRIMARY KEY ("inventoryId","crewId")
);

-- CreateTable
CREATE TABLE "CrewStorage" (
    "storageId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "CrewStorage_pkey" PRIMARY KEY ("storageId","crewId")
);

-- CreateTable
CREATE TABLE "CrewIngredient" (
    "ingredientId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "CrewIngredient_pkey" PRIMARY KEY ("ingredientId","crewId")
);

-- CreateTable
CREATE TABLE "CrewRecipeBook" (
    "recipeBookId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "CrewRecipeBook_pkey" PRIMARY KEY ("recipeBookId","crewId")
);

-- CreateTable
CREATE TABLE "CrewBuild" (
    "buildId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "CrewBuild_pkey" PRIMARY KEY ("buildId","crewId")
);

-- AddForeignKey
ALTER TABLE "CrewInventory" ADD CONSTRAINT "CrewInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewInventory" ADD CONSTRAINT "CrewInventory_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewStorage" ADD CONSTRAINT "CrewStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewStorage" ADD CONSTRAINT "CrewStorage_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewIngredient" ADD CONSTRAINT "CrewIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "SpecificIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewIngredient" ADD CONSTRAINT "CrewIngredient_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewRecipeBook" ADD CONSTRAINT "CrewRecipeBook_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewRecipeBook" ADD CONSTRAINT "CrewRecipeBook_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewBuild" ADD CONSTRAINT "CrewBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewBuild" ADD CONSTRAINT "CrewBuild_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;
