-- CreateTable
CREATE TABLE "User" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "email" STRING NOT NULL,
    "username" STRING,
    "diagnosis" STRING NOT NULL,
    "interest" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
