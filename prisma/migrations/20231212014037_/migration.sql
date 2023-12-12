-- AlterTable
ALTER TABLE "Touch" ADD COLUMN     "version" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "ArchivedTouch" (
    "id" TEXT NOT NULL,
    "buildId" TEXT NOT NULL,
    "order" INTEGER,
    "amount" REAL,
    "unit" VARCHAR(50),
    "genericIngredientId" TEXT NOT NULL,
    "specificIngredientId" TEXT,
    "version" INTEGER,

    CONSTRAINT "ArchivedTouch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchivedTouch" ADD CONSTRAINT "ArchivedTouch_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedTouch" ADD CONSTRAINT "ArchivedTouch_genericIngredientId_fkey" FOREIGN KEY ("genericIngredientId") REFERENCES "GenericIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ArchivedTouch" ADD CONSTRAINT "ArchivedTouch_specificIngredientId_fkey" FOREIGN KEY ("specificIngredientId") REFERENCES "SpecificIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
