/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_User" (
    "email" STRING NOT NULL,
    "username" STRING,
    "diagnosis" STRING NOT NULL,
    "interest" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DROP INDEX "User_email_key";
INSERT INTO "_prisma_new_User" ("createdAt","diagnosis","email","interest","username") SELECT "createdAt","diagnosis","email","interest","username" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
