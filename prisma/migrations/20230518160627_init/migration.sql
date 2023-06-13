/*
  Warnings:

  - You are about to alter the column `code` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.

*/
-- DropIndex
DROP INDEX "User_code_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(9);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPool" (
    "id" SERIAL NOT NULL,
    "instruction" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "audio_path" TEXT NOT NULL,
    "min_time" INTEGER NOT NULL,
    "max_time" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "QuestionPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "transcript" TEXT NOT NULL,
    "video_path" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftSkills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SoftSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkills" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "UserSkills_pkey" PRIMARY KEY ("id")
);
