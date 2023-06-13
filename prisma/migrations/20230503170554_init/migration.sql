/*
  Warnings:

  - Changed the type of `evaluation_type` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "evaluation_type",
ADD COLUMN     "evaluation_type" INTEGER NOT NULL;
