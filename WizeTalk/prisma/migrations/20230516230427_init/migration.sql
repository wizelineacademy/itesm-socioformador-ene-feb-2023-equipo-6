/*
  Warnings:

  - You are about to alter the column `code` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.

*/
-- DropIndex
DROP INDEX "User_code_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(9);
