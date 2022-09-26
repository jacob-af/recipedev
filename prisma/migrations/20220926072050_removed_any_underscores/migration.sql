/*
  Warnings:

  - You are about to drop the column `date_created` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `date_joined` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "date_created",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date_joined",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "user_name",
ADD COLUMN     "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" VARCHAR(25),
ADD COLUMN     "lastName" VARCHAR(50),
ADD COLUMN     "userName" VARCHAR(255) NOT NULL;
