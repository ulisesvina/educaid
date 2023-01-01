/*
  Warnings:

  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "type" INT4 NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "type" INT4 NOT NULL;
