-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_recipe_id_fkey";

-- CreateTable
CREATE TABLE "_RecipesTospecs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipesTospecs_AB_unique" ON "_RecipesTospecs"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipesTospecs_B_index" ON "_RecipesTospecs"("B");

-- AddForeignKey
ALTER TABLE "_RecipesTospecs" ADD CONSTRAINT "_RecipesTospecs_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesTospecs" ADD CONSTRAINT "_RecipesTospecs_B_fkey" FOREIGN KEY ("B") REFERENCES "specs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
