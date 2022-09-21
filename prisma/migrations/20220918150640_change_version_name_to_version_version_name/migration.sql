/*
  Warnings:

  - You are about to drop the column `name` on the `Version` table. All the data in the column will be lost.
  - Added the required column `versionName` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Version" DROP COLUMN "name",
ADD COLUMN     "versionName" TEXT NOT NULL;
